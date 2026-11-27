#!/bin/sh
# Proves the rules in data-model.md on PostgreSQL 16 (issue #47).
# It loads every SQL block in data-model.md that starts with "create", then runs the checks.
# Each check prints PASS or FAIL. The race checks run two psql sessions at the same time.
# It works only inside its own schema, twen_dm_check, and drops it at the end.
#
#   DATABASE_URL=postgresql://postgres:postgres@localhost:55432/postgres sh docs/architecture/data-model-check.sh
: "${DATABASE_URL:?Set DATABASE_URL to a PostgreSQL 16 database (see data-model.md, How to check it)}"
doc="$(dirname "$0")/data-model.md"
export PGOPTIONS="-c search_path=twen_dm_check -c client_min_messages=warning"
p() { psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -X -q "$@"; }
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT
fails=0
pass() { echo "PASS $1"; }
fail() { echo "FAIL $1: $2"; fails=$((fails + 1)); }
q() { p -t -A -c "$1" 2>&1; }
expect_err() { out=$(q "$2"); case "$out" in *"$3"*) pass "$1";; *) fail "$1" "$out";; esac; }
expect_eq() { [ "$2" = "$3" ] && pass "$1" || fail "$1" "got [$2], want [$3]"; }

p -c "drop schema if exists twen_dm_check cascade; create schema twen_dm_check;" || exit 1
awk '/^```sql$/ { inb = 1; first = 1; keep = 0; next }
     /^```/     { inb = 0; next }
     inb        { if (first) { keep = ($0 ~ /^create /); first = 0 } if (keep) print }' "$doc" \
  | p >/dev/null || { echo "FAIL the schema in data-model.md did not load"; exit 1; }
echo "--- schema from data-model.md loaded: $(q "select count(*) from pg_tables where schemaname = 'twen_dm_check'") tables"

# A ticket issue, as the backend will run it: take the next daily number, then insert.
issue() {  # issue <channel> <status> <phone or null> <band or null>
  q "with n as (
       insert into ticket_counters as c (clinic_id, service_day, last_number)
       values ('demo-opd', (now() at time zone 'Africa/Accra')::date, 1)
       on conflict (clinic_id, service_day) do update set last_number = c.last_number + 1
       returning last_number)
     insert into tickets (clinic_id, number, channel, status, phone, travel_band, language, arrived_at)
     select 'demo-opd', n.last_number, '$1', '$2', $3, $4, 'en',
            case when '$2' = 'arrived' then now() end from n
     returning number;"
}
# An event append, as the backend will run it: bump the clinic's counter, insert with that seq.
append_sql() {  # append_sql <type> <ticket uuid or null>
  echo "with s as (update clinics set last_event_seq = last_event_seq + 1 where id = 'demo-opd'
                   returning id, last_event_seq)
        insert into events (clinic_id, seq, type, ticket_id, actor)
        select s.id, s.last_event_seq, '$1', $2, 'system' from s returning seq;"
}
# Seconds since this transaction began (it includes B's 0.5 s head start).
ELAPSED="select round(extract(epoch from clock_timestamp() - now())::numeric, 1);"
CALL_NEXT="update tickets t set status = 'called', called_at = now()
  where t.id = (select id from tickets where clinic_id = 'demo-opd' and status = 'arrived'
                order by queue_key, id limit 1 for no key update skip locked)
  returning t.number;"

q "insert into clinics (id, name, ticket_prefix) values ('demo-opd', 'Demo District Hospital OPD', 'B');
   insert into staff_users (id, clinic_id, display_name, token_sha256)
   values ('staff-a', 'demo-opd', 'Staff A', sha256('seed-token-a'));" >/dev/null

echo "--- clinic defaults"
expect_eq "new clinic starts with grace 20, staff 1, seq 0" \
  "$(q "select grace_minutes||','||staff_on_duty||','||last_event_seq from clinics")" "20,1,0"
expect_err "staff on duty above 50 is refused" "update clinics set staff_on_duty = 51" "check constraint"

echo "--- daily ticket counter"
expect_eq "first ticket of the day is number 1" "$(issue desk arrived null null)" "1"
expect_eq "second is number 2" "$(issue ussd waiting "'+10000000001'" "'15_30'")" "2"
expect_eq "third is number 3" "$(issue web waiting "'+10000000002'" "'30_60'")" "3"
expect_eq "ticket code builds as B-003" \
  "$(q "select c.ticket_prefix || '-' || lpad(t.number::text, 3, '0') from tickets t join clinics c on c.id = t.clinic_id where number = 3")" "B-003"
expect_err "same (clinic, day, number) twice is refused" \
  "insert into tickets (clinic_id, number, channel, status, language, arrived_at) values ('demo-opd', 1, 'desk', 'arrived', 'en', now())" \
  "tickets_clinic_id_service_day_number_key"
expect_eq "service_day is the Accra date of issued_at" \
  "$(q "select bool_and(service_day = (issued_at at time zone 'Africa/Accra')::date) from tickets")" "t"

echo "--- one active ticket per phone"
out=$(issue desk waiting "'+10000000001'" "'under_15'")
case "$out" in *tickets_one_active_per_phone*) pass "duplicate phone hits tickets_one_active_per_phone";; *) fail "duplicate phone" "$out";; esac
expect_eq "the failed issue left no gap in the counter" \
  "$(q "select last_number from ticket_counters")" "3"
q "update tickets set status = 'cancelled', closed_at = now() where number = 2" >/dev/null
expect_eq "after cancelling, the same phone may join again" "$(issue ussd waiting "'+10000000001'" "'15_30'")" "4"
expect_err "web ticket without a phone is refused" \
  "insert into tickets (clinic_id, number, channel, status, language) values ('demo-opd', 900, 'web', 'waiting', 'en')" "check constraint"

echo "--- ceiling of 999"
q "update ticket_counters set last_number = 999" >/dev/null
out=$(issue desk arrived null null)
case "$out" in *ticket_counters_last_number_check*) pass "ticket 1000 is refused by the counter's check";; *) fail "ticket 1000" "$out";; esac
q "update ticket_counters set last_number = 4" >/dev/null

echo "--- status and timestamps agree"
expect_err "called without called_at is refused" \
  "update tickets set status = 'called' where number = 1" "check constraint"
expect_err "closed status without closed_at is refused" \
  "update tickets set status = 'seen', called_at = now() where number = 1" "check constraint"

echo "--- events"
expect_eq "first event gets seq 1" "$(q "$(append_sql status_changed null)")" "1"
expect_eq "next gets seq 2" "$(q "$(append_sql status_changed null)")" "2"
expect_err "update is refused (append-only)" "update events set data = '{}'" "append-only"
expect_err "delete is refused (append-only)" "delete from events" "append-only"
expect_err "same (clinic, seq) twice is refused" \
  "insert into events (clinic_id, seq, type, actor) values ('demo-opd', 1, 'status_changed', 'system')" "events_pkey"
expect_err "staff event without actor_id is refused" \
  "insert into events (clinic_id, seq, type, actor) values ('demo-opd', 99, 'settings_changed', 'staff')" "check constraint"
expect_err "ticket event without ticket_id is refused" \
  "insert into events (clinic_id, seq, type, actor) values ('demo-opd', 99, 'called', 'system')" "check constraint"

echo "--- race: seq order equals commit order"
# A takes seq 3 and holds its transaction open for 2 s. B starts 0.5 s later.
( p -t -A -c "begin; $(append_sql status_changed null) select pg_sleep(2); commit;" > "$tmp" 2>&1 ) &
b=$(p -t -A -c "select pg_sleep(0.5); $(append_sql status_changed null)" | tail -1)
wait
a=$(head -1 "$tmp")
expect_eq "A got seq 3, B waited and got seq 4" "$a,$b" "3,4"
# The trap this avoids: with an identity column, B's higher number commits first.
q "create table race_demo (id bigint generated always as identity, at timestamptz)" >/dev/null
( p -t -A -c "begin; insert into race_demo (at) values (now()) returning id; select pg_sleep(2); commit;" > "$tmp" 2>&1 ) &
seen=$(p -t -A -c "select pg_sleep(0.5); insert into race_demo (at) values (now()); select string_agg(id::text, ',') from race_demo;" | tail -1)
wait
expect_eq "identity column: a poller after B's commit sees only id 2, so it would skip id 1" "$seen" "2"
q "drop table race_demo" >/dev/null

echo "--- race: two nurses tap call-next at once"
q "update tickets set status = 'arrived', arrived_at = now() where status = 'waiting'" >/dev/null
order=$(q "select string_agg(number::text, ',' order by queue_key, id) from tickets where status = 'arrived'")
first=$(echo "$order" | cut -d, -f1); second=$(echo "$order" | cut -d, -f2)
( p -t -A -c "begin; $CALL_NEXT select pg_sleep(2); commit;" > "$tmp" 2>&1 ) &
b=$(p -t -A -c "begin; select pg_sleep(0.5); $CALL_NEXT $ELAPSED commit;" | grep . | tr '\n' ' ')
wait
a=$(head -1 "$tmp")
expect_eq "SKIP LOCKED: A calls the first arrived ($first); B calls the next ($second) without waiting" "$a | $b" "$first | $second 0.5 "
# Contrast: plain FOR UPDATE. B waits for A, then finds its row is no longer arrived.
q "update tickets set status = 'arrived', called_at = null where number in ($first, $second)" >/dev/null
PLAIN=$(echo "$CALL_NEXT" | sed 's/ skip locked//')
( p -t -A -c "begin; $PLAIN select pg_sleep(2); commit;" > "$tmp" 2>&1 ) &
b=$(p -t -A -c "begin; select pg_sleep(0.5); $PLAIN $ELAPSED commit;" | grep . | tr '\n' ' ')
wait
expect_eq "without SKIP LOCKED: B also calls $second, but only after waiting for A to commit" "$b" "$second 2.0 "
# An uncommitted event about the first arrived ticket (say, a delivery report) puts a light
# foreign-key lock on it. FOR UPDATE would skip that ticket; FOR NO KEY UPDATE does not.
q "update tickets set status = 'arrived', called_at = null where number in ($first, $second)" >/dev/null
for lock in "for update skip locked" "for no key update skip locked"; do
  ( p -t -A -c "begin; $(append_sql sms_updated "(select id from tickets where number = $first)") select pg_sleep(2); commit;" > "$tmp" 2>&1 ) &
  got=$(p -t -A -c "select pg_sleep(0.5); $(echo "$CALL_NEXT" | sed "s/for no key update skip locked/$lock/")" | grep .)
  wait
  q "update tickets set status = 'arrived', called_at = null where number in ($first, $second)" >/dev/null
  case "$lock" in
    "for update skip locked") expect_eq "FOR UPDATE skips the first ticket while an event about it is being saved" "$got" "$second" ;;
    *) expect_eq "FOR NO KEY UPDATE still calls the first ticket ($first) while an event about it is being saved" "$got" "$first" ;;
  esac
done

expect_eq "a closed web ticket may have its phone blanked" \
  "$(q "update tickets set phone = null where channel = 'web' and status = 'cancelled' returning 'ok'" ; q "insert into tickets (clinic_id, number, channel, status, travel_band, language, closed_at) values ('demo-opd', 901, 'web', 'cancelled', 'under_15', 'en', now()) returning 'ok'")" "ok"
expect_err "an open web ticket may not" \
  "insert into tickets (clinic_id, number, channel, status, travel_band, language) values ('demo-opd', 902, 'web', 'waiting', 'under_15', 'en')" "check constraint"

echo "--- override moves one row"
q "update tickets set status = 'waiting', called_at = null, arrived_at = null where status in ('arrived', 'called') and channel <> 'desk'" >/dev/null
last=$(q "select id from tickets where status in ('waiting','notified','arrived') order by queue_key desc, id desc limit 1")
q "with q as (
     select queue_key, row_number() over (order by queue_key, id) as pos from tickets
     where clinic_id = 'demo-opd' and status in ('waiting', 'notified', 'arrived') and id <> '$last'),
   gap as (
     select (select queue_key from q where pos = least(1, (select count(*) from q) + 1) - 1) as before_key,
            (select queue_key from q where pos = least(1, (select count(*) from q) + 1)) as after_key)
   update tickets t
   set queue_key = coalesce((g.before_key + g.after_key) * 0.5, g.after_key - 1, g.before_key + 1, t.queue_key),
       overridden = true
   from gap g where t.id = '$last' and t.status in ('waiting', 'notified', 'arrived');" >/dev/null
expect_eq "the last ticket is now position 1" \
  "$(q "select id from tickets where status in ('waiting','notified','arrived') order by queue_key, id limit 1")" "$last"

expect_eq "100 overrides into the same gap give 101 different keys (times 0.5 stays exact)" \
  "$(q "with recursive h(i, lo, hi) as (select 0, extract(epoch from now()), extract(epoch from now()) + 1
        union all select i + 1, lo, (lo + hi) * 0.5 from h where i < 100) select count(distinct hi) from h")" "101"

echo "--- outbox"
t=$(q "select id from tickets where channel = 'web' limit 1")
s=$(q "$(append_sql notified "'$t'")")
q "insert into sms_outbox (clinic_id, ticket_id, event_type, event_seq, body) values ('demo-opd', '$t', 'notified', $s, 'Come now')" >/dev/null
expect_err "same (ticket, event type, seq) twice is refused" \
  "insert into sms_outbox (clinic_id, ticket_id, event_type, event_seq, body) values ('demo-opd', '$t', 'notified', $s, 'Come now')" \
  "sms_outbox_ticket_id_event_type_event_seq_key"
expect_err "a key naming an event that does not exist is refused" \
  "insert into sms_outbox (clinic_id, ticket_id, event_type, event_seq, body) values ('demo-opd', '$t', 'notified', 9999, 'x')" \
  "foreign key"
t2=$(q "select id from tickets where channel = 'ussd' and status = 'waiting' limit 1")
s2=$(q "$(append_sql notified "'$t2'")")
q "insert into sms_outbox (clinic_id, ticket_id, event_type, event_seq, body) values ('demo-opd', '$t2', 'notified', $s2, 'Come now')" >/dev/null
CLAIM="select o.id from sms_outbox o join tickets t on t.id = o.ticket_id
  where o.status = 'queued' and o.next_attempt_at <= now()
  order by o.next_attempt_at, o.id limit 1 for update of o skip locked;"
( p -t -A -c "begin; $CLAIM select pg_sleep(2); commit;" > "$tmp" 2>&1 ) &
b=$(p -t -A -c "select pg_sleep(0.5); $CLAIM" | tail -1)
wait
a=$(head -1 "$tmp")
[ -n "$a" ] && [ -n "$b" ] && [ "$a" != "$b" ] && pass "two workers claim different messages ($a, $b)" || fail "two workers" "$a,$b"
expect_eq "smsStatus is read from the outbox" \
  "$(q "select o.status from tickets t left join sms_outbox o on o.ticket_id = t.id and o.event_type = 'notified' where t.id = '$t'")" "queued"
q "update sms_outbox set provider_message_id = 'ATXid_1' where ticket_id = '$t'" >/dev/null
expect_err "a provider message id belongs to one message" \
  "update sms_outbox set provider_message_id = 'ATXid_1' where ticket_id = '$t2'" "sms_outbox_provider_message_id_key"

echo "--- idempotency keys"
H="sha256('POST /clinics/demo-opd/queue/call-next')"
IDEM="insert into idempotency_keys (scope, key, request_hash) values ('staff-a', 'k-1', $H)
  on conflict (scope, key) do nothing returning 'first';"
( p -t -A -c "begin; $IDEM select pg_sleep(2);
     update idempotency_keys set status_code = 204 where scope = 'staff-a' and key = 'k-1'; commit;" > "$tmp" 2>&1 ) &
b=$(p -t -A -c "select pg_sleep(0.5); $IDEM select 'stored ' || status_code from idempotency_keys where scope = 'staff-a' and key = 'k-1';" | grep . | tr '\n' ' ')
wait
a=$(head -1 "$tmp")
expect_eq "A does the work; B's retry waits, then reads A's stored 204" "$a|$b" "first|stored 204 "
expect_eq "the same key under another scope is a different key" \
  "$(q "insert into idempotency_keys (scope, key, request_hash) values ('web', 'k-1', $H) on conflict do nothing returning 'new'")" "new"
expect_err "a key longer than 128 characters is refused" \
  "insert into idempotency_keys (scope, key, request_hash) values ('web', repeat('x', 129), $H)" "check constraint"

p -c "drop schema twen_dm_check cascade;"
echo "--- $fails failed"
exit $fails
