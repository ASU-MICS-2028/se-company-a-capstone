# Data model: tables, keys and the ERD

**Status:** draft for [#47](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/47), part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7). It follows API contract v0.2 in [PR #55](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/55), which is still under review. If that review changes the contract, this file changes with it. The stack is PostgreSQL 16 with SQLAlchemy 2 and Alembic, as proposed in [PR #57](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/57). There is no database port: the queue code talks to these tables directly.

**What this gives the backend.** Eight tables, and the database rules that keep the queue honest even when two nurses tap at once or a weak network repeats a request. The SQL in each table section is the real schema: [`data-model-check.sh`](data-model-check.sh) reads it from this file, loads it into PostgreSQL 16 and proves each rule (40 checks). #49 turns it into the first Alembic migration.

## The ERD

An ERD (entity-relationship diagram) shows the tables and how they point at each other. `||--o{` reads as *one to zero or more*, and `||--o|` as *one to zero or one*. PK is the primary key, FK a foreign key (a column that must match a row in another table), and UK a unique key.

```mermaid
erDiagram
    clinics ||--o{ staff_users : employs
    clinics ||--o| service_status : "shows today"
    clinics ||--o{ ticket_counters : "numbers each day"
    clinics ||--o{ tickets : issues
    clinics ||--o{ events : logs
    tickets ||--o{ events : "is the subject of"
    staff_users ||--o{ events : "acts in"
    tickets ||--o| sms_outbox : "gets a come-now SMS"
    events ||--o| sms_outbox : causes

    clinics {
        text id PK "slug, e.g. demo-opd"
        text name
        text ticket_prefix "one letter"
        integer staff_on_duty "the c in M/M/c"
        integer grace_minutes "default 20"
        bigint last_event_seq "event counter"
        timestamptz created_at
    }
    staff_users {
        text id PK "the actorId"
        text clinic_id FK
        text display_name
        bytea token_sha256 UK "hash, never the token"
        boolean active
        timestamptz created_at
    }
    service_status {
        text clinic_id PK, FK
        boolean prescriber_in
        text note "160 characters at most"
        timestamptz updated_at
    }
    ticket_counters {
        text clinic_id PK, FK
        date service_day PK
        integer last_number "1 to 999"
    }
    tickets {
        uuid id PK "random, also the web link"
        text clinic_id FK, UK
        timestamptz issued_at
        date service_day UK "Accra date of issued_at"
        integer number UK "1 to 999"
        text channel "ussd, web or desk"
        text status "seven states"
        text phone "E.164, one active per clinic"
        text travel_band
        text language "en or tw"
        numeric queue_key "calling order"
        timestamptz hold_until
        timestamptz notified_at
        timestamptz arrived_at
        timestamptz called_at
        timestamptz closed_at
        boolean overridden
    }
    events {
        text clinic_id PK, FK
        bigint seq PK "per clinic, commit order"
        text type
        uuid ticket_id FK
        timestamptz at
        text actor "patient, staff or system"
        text actor_id FK "staff only"
        jsonb data
    }
    sms_outbox {
        bigint id PK
        text clinic_id FK
        uuid ticket_id FK, UK
        text event_type UK "notified"
        bigint event_seq FK, UK
        text body
        text status "queued, sent, delivered or failed"
        integer attempts
        timestamptz next_attempt_at
        text provider_message_id UK
        text last_error
        timestamptz created_at
        timestamptz updated_at
    }
    idempotency_keys {
        text scope PK "staff user id, or web"
        text key PK "the Idempotency-Key header"
        bytea request_hash
        smallint status_code
        jsonb response_body
        timestamptz created_at
    }
```

`idempotency_keys` has no lines because it belongs to no other table. It records requests, not queue data.

## Conventions

- **Names** are lowercase `snake_case`, so nobody ever has to quote them. The API's `camelCase` (for example `staffOnDuty`) maps to `staff_on_duty`.
- **Times** are `timestamptz` (a timestamp that knows its time zone), stored in UTC, as the contract says.
- **Fixed lists** (status, channel, travel band) are `text` with a `check` constraint, not PostgreSQL `enum` types. Changing a check is a small Alembic migration (drop it, add the new one). A PostgreSQL enum value is hard to remove, and a new one cannot be used in the transaction that adds it.
- **Ids.** Clinics and staff use short text slugs, because they appear in URLs and in `actorId`. Tickets use a random UUID (version 4) because the contract makes the ticket id the private link to the patient's status page, so it must be unguessable. Best practice prefers sequential keys for big tables, because random keys scatter inserts across the index. At a few hundred tickets a day that cost does not show. A time-ordered UUID (version 7) would leak when the ticket was made, and PostgreSQL 16 has no built-in generator for it anyway.
- **Isolation level.** Every transaction runs at READ COMMITTED, PostgreSQL's default: each statement sees what was committed before it started. The re-checks, the guarded updates and the waits described below rely on it. Don't raise a session to REPEATABLE READ or SERIALIZABLE without re-testing them.
- **`-- ponytail:` comments** mark a deliberate shortcut, with its limit and what to do when it bites.
- **Personal data.** The phone number lives in one column only, `tickets.phone`. Events never carry it (the contract says so for web tickets, and we apply it to every channel). The outbox joins to the ticket for it instead of copying it.

## The tables

### 1. `clinics`

**Why it exists.** The clinic is the root of everything: each ticket, event and staff user belongs to one. It holds the two settings staff change during the day (`staffOnDuty` and `graceMinutes`), and the counter that numbers the clinic's events.

```sql
create table clinics (
  id             text primary key check (id ~ '^[a-z0-9-]{2,40}$'),  -- slug, e.g. demo-opd
  name           text not null,
  ticket_prefix  text not null check (ticket_prefix ~ '^[A-Z]$'),
  staff_on_duty  integer not null default 1 check (staff_on_duty between 0 and 50),
  grace_minutes  integer not null default 20 check (grace_minutes between 0 and 240),
  last_event_seq bigint not null default 0 check (last_event_seq >= 0),  -- see Event seq below
  created_at     timestamptz not null default now()
);
```

- The limits (0 to 50 staff, 0 to 240 minutes, one capital letter) are the contract's own.
- `grace_minutes` starts at 20, as the contract says. `staff_on_duty` starts at 1. The contract is silent on that one (open question 3).
- `last_event_seq` is the last `seq` handed out for this clinic. Why it lives here is explained under [Event seq](#event-seq-equals-commit-order).
- `meanServiceMinutes` and `waitingCount` are not columns. They are computed from `tickets` when read (see [Derived, not stored](#derived-not-stored)).

### 2. `staff_users`

**Why it exists.** Every staff action must be attributable: an override records who did it in `actorId`. The contract says each bearer token is tied to one staff user, and that login is out of scope, with seeded tokens. This table is where those seeded users and their tokens live.

```sql
create table staff_users (
  id           text primary key check (id ~ '^[a-z0-9-]{2,40}$'),  -- shown as actorId, e.g. staff-comfort
  clinic_id    text not null references clinics (id),  -- ponytail: no index, a clinic has a handful of staff
  display_name text not null,
  token_sha256 bytea not null unique check (octet_length(token_sha256) = 32),  -- hash only, never the token
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);
```

- **Only a hash of the token is stored.** The API hashes the incoming bearer token with SHA-256 and looks it up by `token_sha256`, which is unique. If the database leaks, nobody can sign in with what is in it. The tokens are long random strings, so a plain SHA-256 is enough (a password chosen by a person would need a slow, salted hash instead). The tokens themselves never go in the repo.
- There is no role column: the contract has one role, `staff`. Add it when a second role appears.
- Staff are switched off with `active = false`, never deleted, so old events still point at a real row.

### 3. `service_status` (a Should)

**Why it exists.** Research finding F1: patients want to know before they travel whether the prescriber is in. Staff set it in one step, and the USSD menu and the SMS show it. It is a Should, so it sits in its own table and can be dropped without touching `clinics`.

```sql
create table service_status (
  clinic_id     text primary key references clinics (id),
  prescriber_in boolean not null,
  note          text check (char_length(note) <= 160),
  updated_at    timestamptz not null default now()
);
```

- One row per clinic, overwritten on each change. No row means `Clinic.status` is null.
- The history of changes is already in `events` (`status_changed`), so this table keeps only the latest.
- The 160-character limit is the contract's, so a note fits in one SMS.

### 4. `ticket_counters`

**Why it exists.** Ticket codes like `B-047` restart at 001 each day, per clinic, up to 999. Something has to hand out the next number exactly once, even when the desk, USSD and the web page issue tickets at the same moment.

```sql
create table ticket_counters (
  clinic_id   text not null references clinics (id),
  service_day date not null,
  last_number integer not null check (last_number between 1 and 999),
  primary key (clinic_id, service_day)
);
```

Issuing a ticket takes the next number and inserts the ticket in one statement:

```sql
with n as (
  insert into ticket_counters as c (clinic_id, service_day, last_number)
  values (:clinic_id, (now() at time zone 'Africa/Accra')::date, 1)
  on conflict (clinic_id, service_day) do update set last_number = c.last_number + 1
  returning last_number
)
insert into tickets (clinic_id, number, channel, status, phone, travel_band, language, arrived_at)
select :clinic_id, n.last_number, :channel, :status, :phone, :travel_band, :language,
       case when :status = 'arrived' then now() end  -- a desk ticket starts as arrived
from n
returning *;
```

- **The first ticket of the day creates the row** with 1. Later tickets add 1 to it (an upsert: insert, or update if the row exists). Midnight needs no reset job: a new day simply has no row yet.
- **Two tickets at once can't get the same number.** The update locks the counter row, so the second waits a few milliseconds and gets the next number.
- **No gaps.** If the ticket insert fails (for example, the phone already has a ticket), the whole transaction rolls back, and the counter with it. A PostgreSQL `sequence` would not roll back, and it cannot restart per clinic per day.
- **Ticket 1000 is refused** by the `check`. What the API should answer then is open question 2.

### 5. `tickets`

**Why it exists.** A ticket is one patient's place in the queue, from joining to leaving: its channel, status, phone, travel band, calling order, and the time of each step.

```sql
create table tickets (
  id           uuid primary key default gen_random_uuid(),  -- random v4: it is also the web status link
  clinic_id    text not null references clinics (id),
  issued_at    timestamptz not null default now(),
  -- ponytail: Ghana is UTC+0 all year and we have one clinic; add clinics.time_zone when that changes
  service_day  date not null generated always as ((issued_at at time zone 'Africa/Accra')::date) stored,
  number       integer not null check (number between 1 and 999),
  channel      text not null check (channel in ('ussd', 'web', 'desk')),
  status       text not null check (status in
                 ('waiting', 'notified', 'arrived', 'called', 'seen', 'no_show', 'cancelled')),
  phone        text check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  travel_band  text check (travel_band in ('under_15', '15_30', '30_60', 'over_60')),
  language     text not null check (language in ('en', 'tw')),
  queue_key    numeric not null default extract(epoch from now()),  -- see Calling order below
  hold_until   timestamptz,
  notified_at  timestamptz,
  arrived_at   timestamptz,
  called_at    timestamptz,
  closed_at    timestamptz,
  overridden   boolean not null default false,

  unique (clinic_id, service_day, number),
  check (channel = 'desk' or (travel_band is not null and (phone is not null or closed_at is not null))),
  check ((status in ('seen', 'no_show', 'cancelled')) = (closed_at is not null)),
  check (status <> 'notified' or notified_at is not null),
  check (status not in ('arrived', 'called', 'seen') or arrived_at is not null),
  check (status not in ('called', 'seen') or called_at is not null)
);

-- One active ticket per phone per clinic, whichever channel issued it.
create unique index tickets_one_active_per_phone on tickets (clinic_id, phone)
  where status in ('waiting', 'notified', 'arrived', 'called') and phone is not null;

-- The live queue in calling order: board, position and call-next.
create index tickets_active_in_order on tickets (clinic_id, queue_key)
  where status in ('waiting', 'notified', 'arrived', 'called');

-- Recent consultations, for meanServiceMinutes and the recent service rate.
create index tickets_recently_seen on tickets (clinic_id, closed_at)
  where status = 'seen';
```

- **`service_day` is computed by the database** from `issued_at`: a generated column, so the two can never disagree. It is the date in Accra, because the contract restarts the counter at midnight there. Ghana is UTC+0, so it equals the UTC date today. The time zone is written in, because there is one clinic.
- **The code is not stored.** `B-047` is `ticket_prefix || '-' || lpad(number::text, 3, '0')`, built when read. The contract gives no way to change a clinic's prefix, so a code never changes. If a prefix ever becomes editable, store the code.
- **USSD and web tickets must have a phone and a travel band** while they are open: one says where to send the "come now" SMS, the other sets `holdUntil`. Once a ticket closes, its phone may be blanked (open question 8). A desk ticket may have neither. `waitOffSite` from the desk is not stored: it only decides whether the ticket starts as `waiting` or `arrived`, and the API checks that it comes with a phone and a band.
- **The status and the timestamps must agree.** A closed ticket (`seen`, `no_show`, `cancelled`) has a `closed_at`, and an open one doesn't. A `called` ticket has a `called_at`, and so on. These checks don't enforce the whole state table (the backend does that, see [Ticket moves](#ticket-moves-and-repeats)), but they make some impossible rows impossible to store.
- **`hold_until`** is set by the worker when the SMS is first marked sent: send time, plus the top of the travel band, plus `grace_minutes` (the contract's formula).
- **Indexes are partial** (they cover only the rows a query asks about), so they stay small while closed tickets pile up. A partial index only gets used when the query's `where` matches its own, so the backend's queries must keep the same status lists.

#### Calling order

The queue is not simply oldest first: an override moves a patient ahead, and the daily number restarts at midnight while yesterday's ticket may still be open. So each ticket carries its own sort key, `queue_key`:

- A new ticket gets the moment it was issued, in seconds (`extract(epoch from now())`), so tickets join at the back in issue order. Two tickets with an equal key are ordered by `id`.
- **An override changes one row only.** To move a ticket to position *k*, it takes the keys of the tickets now at *k − 1* and *k* and gives the moved ticket the halfway point. No other ticket is rewritten, so an override locks one row.
- **Halve by multiplying by 0.5, not dividing by 2.** `numeric` division rounds to a fixed number of decimals, so 100 overrides into the same gap gave only 28 different keys. Multiplying keeps every decimal, and all 101 stayed different (the check script tests this).
- `position` is never stored, because every call would change everyone's position. It is the ticket's row number among `waiting`, `notified` and `arrived` tickets ordered by `(queue_key, id)`.

```sql
-- Move :ticket_id to position :k (1 = first), counting the other active tickets.
with q as (
  select queue_key, row_number() over (order by queue_key, id) as pos
  from tickets
  where clinic_id = :clinic_id and status in ('waiting', 'notified', 'arrived') and id <> :ticket_id
),
gap as (
  select (select queue_key from q where pos = least(:k, (select count(*) from q) + 1) - 1) as before_key,
         (select queue_key from q where pos = least(:k, (select count(*) from q) + 1)) as after_key
)
update tickets t
set queue_key = coalesce((g.before_key + g.after_key) * 0.5,  -- between two tickets
                         g.after_key - 1,                    -- ahead of the first
                         g.before_key + 1,                   -- after the last
                         t.queue_key),                       -- alone in the queue
    overridden = true
from gap g
where t.id = :ticket_id and t.status in ('waiting', 'notified', 'arrived');
```

Two overrides at the same instant could pick the same halfway point. The tie is then broken by `id`, so the order is still stable, and both moves are logged as events.

### 6. `events`

**Why it exists.** Every state change appends one row: the board polls it to refresh (`GET /events?after=`), the audit trail reads it to see who did what, and the evaluation uses it as ground truth. Rows are added, never changed.

```sql
create table events (
  clinic_id text not null references clinics (id),
  seq       bigint not null check (seq >= 1),
  type      text not null check (type in ('joined', 'notified', 'arrived', 'called', 'seen', 'no_show',
              'cancelled', 'override', 'sms_updated', 'status_changed', 'settings_changed')),
  ticket_id uuid references tickets (id),
  at        timestamptz not null default now(),
  actor     text not null check (actor in ('patient', 'staff', 'system')),
  actor_id  text references staff_users (id),  -- ponytail: no index, staff are never deleted
  data      jsonb not null default '{}',

  primary key (clinic_id, seq),
  check ((actor = 'staff') = (actor_id is not null)),
  check ((type in ('status_changed', 'settings_changed')) = (ticket_id is null))
);

create index events_by_ticket on events (ticket_id);
```

```sql
create function events_are_append_only() returns trigger language plpgsql as $$
begin
  raise exception 'events are append-only: % is not allowed', tg_op;
end $$;

create trigger events_append_only before update or delete on events
  for each row execute function events_are_append_only();
```

- **The primary key `(clinic_id, seq)` is the unique (clinic, seq) rule**, and it also serves the board's poll (`where clinic_id = :c and seq > :after order by seq`).
- **`actor_id` is set exactly when `actor` is staff.** Then an override can't be logged without the nurse who did it, and a patient or system event can't claim to be a nurse.
- **Clinic events have no ticket**: `status_changed` and `settings_changed` have a null `ticket_id`, and every other type must have one.
- **Append-only is enforced, not just agreed.** The trigger (a function the database runs on each change) refuses any `update` or `delete` on `events`. `truncate` still works, so tests can empty the table.
- **`data`** holds the type's details, as the contract describes: an override's reason, the from and to positions, or a setting's old and new value. Nothing searches inside it, so it has no index. It never holds a phone number, symptoms or a diagnosis.

### 7. `sms_outbox`

**Why it exists.** The "come now" SMS must never be lost and never sent twice, but the SMS provider can't be called inside the request that changes the ticket (a slow provider would freeze the board). So the ticket change and a message row commit together in one transaction. A separate worker sends the row later. This is the transactional outbox ([note](../../knowledge/transactional-outbox.md)).

```sql
create table sms_outbox (
  id                  bigint generated always as identity primary key,
  clinic_id           text not null,
  ticket_id           uuid not null references tickets (id),
  event_type          text not null check (event_type in ('notified')),
  event_seq           bigint not null,
  body                text not null,
  status              text not null default 'queued'
                        check (status in ('queued', 'sent', 'delivered', 'failed')),
  attempts            integer not null default 0 check (attempts >= 0),
  next_attempt_at     timestamptz default now(),  -- null: no more tries
  provider_message_id text unique,
  last_error          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  unique (ticket_id, event_type, event_seq),  -- the message's idempotency key
  foreign key (clinic_id, event_seq) references events (clinic_id, seq)
);

-- What the worker polls: messages due to be sent.
create index sms_outbox_due on sms_outbox (next_attempt_at) where status = 'queued';
```

- **The idempotency key is ticket id + event type + seq**, as proposed in PR #57. It is a unique constraint on the three columns, so a second row for the same event cannot exist. The foreign key to `events` means the seq in the key must be a real event of that clinic.
- **Only `notified` messages exist for now**, because the "come now" SMS is the only Must. A new kind of message adds a value to the check.
- **`body` is written when the row is created**, in the patient's language. What was sent is then on record, and a template change later doesn't rewrite history.
- **`status` uses the same words as the ticket's `smsStatus`.** A failed send is retried with backoff: the worker sets `status` back to `queued`, adds 1 to `attempts`, and pushes `next_attempt_at` later. When it gives up, `next_attempt_at` becomes null and `status` stays `failed`.
- **`provider_message_id`** is the id Africa's Talking returns when it accepts the message. Delivery reports find the row by it, and it is unique. A retry stores the new attempt's id, so a late report for an older attempt matches nothing. The contract already says to log a report for an unknown id and answer 200.
- **The phone is not copied here.** The worker joins to `tickets` for it, so the number lives in one place.

### 8. `idempotency_keys`

**Why it exists.** Clinic networks are weak, so the board and the patient page retry. The contract says every staff write (and the web join) accepts an `Idempotency-Key` header: a repeated key with the same request returns the first response, a reused key with a different request returns 422, and keys are kept for 24 hours. This table remembers each key and the response it got.

```sql
create table idempotency_keys (
  scope         text not null,  -- the staff user id, or 'web' for the patient join
  key           text not null check (char_length(key) between 1 and 128),
  request_hash  bytea not null check (octet_length(request_hash) = 32),
  status_code   smallint,  -- null only inside the transaction that is doing the work
  response_body jsonb,     -- null for 204
  created_at    timestamptz not null default now(),
  primary key (scope, key)
);

create index idempotency_keys_by_age on idempotency_keys (created_at);
```

- **Keys are scoped** to the staff user who sent them, or to `web` for the anonymous join. Two clients that happen to pick the same key then don't collide.
- **`request_hash`** is a SHA-256 of the method, the route, the path parameters and the body. The same key with a different hash means the key was reused for a different request, so the answer is 422.
- **The response is stored whole**, including `call-next`'s 204 with no body, so a retry gets exactly the first answer.
- **128 characters** is the contract's `maxLength` for the header.
- `created_at` is indexed so the clean-up can delete keys older than 24 hours quickly (open question 7).

## How the database enforces the rules

### One active ticket per phone

`tickets_one_active_per_phone` is a **partial unique index**: it only covers tickets whose status is `waiting`, `notified`, `arrived` or `called`, and that have a phone. Two such tickets with the same clinic and phone can't exist, whichever channel tried. Once a ticket closes, it drops out of the index, so the same phone can join again.

The backend still looks first, to give the nice answer (USSD returns the existing ticket, web and desk answer 409). The index is the safety net for the race: two joins from the same phone at the same moment. One commits, and the other gets a unique violation, which the backend turns into the same answer. USSD needs no session table either: a repeated USSD request finds the active ticket instead of making a second one.

### Ticket codes

`unique (clinic_id, service_day, number)` makes a code unique within one clinic and one day. `ticket_counters` hands out the numbers ([section 4](#4-ticket_counters)). The unique constraint is the second line of defence if a bug ever inserts a number by hand.

### Event seq equals commit order

`(clinic_id, seq)` is unique, but unique alone is not enough. The board asks for events `after` the last `seq` it saw. Suppose seq came from an ordinary counter, such as an identity column or a sequence:

1. Transaction A takes seq 5 and is still working.
2. Transaction B takes seq 6 and commits first.
3. The board polls, sees 6, and next asks for events after 6.
4. A commits seq 5. The board never asks for it again, and that event is lost to the board.

So each event takes its seq from the clinic's own counter, `clinics.last_event_seq`, in the same transaction:

```sql
with s as (
  update clinics set last_event_seq = last_event_seq + 1
  where id = :clinic_id
  returning id, last_event_seq
)
insert into events (clinic_id, seq, type, ticket_id, actor, actor_id, data)
select s.id, s.last_event_seq, :type, :ticket_id, :actor, :actor_id, :data from s;
```

The `update` locks the clinic's row until the transaction commits. A second transaction that wants a seq waits for the first to finish. So a higher seq is always committed after a lower one, and the board can't skip one. The check script shows both sides: with the counter, B waits and gets the next seq; with an identity column, a poll after B's commit sees only B's row.

The cost: event appends for one clinic happen one at a time, for the few milliseconds between the append and the commit. At a few writes a second for one clinic that doesn't show. This choice is recorded in [its own decision](../../decisions/2026-11-27-event-seq-comes-from-a-per-clinic-counter.md).

### Lock order, so nothing deadlocks

A deadlock is two transactions each waiting for a row the other holds ([note](../../knowledge/deadlock.md)). Every write takes its locks in the same order, and touches at most one ticket:

1. the `idempotency_keys` row (first, so a repeated request waits before doing anything)
2. the one other row the request is about: the `ticket_counters` row when issuing a ticket, the `sms_outbox` row in the worker or a delivery report, or the `service_status` row
3. the ticket
4. the clinic row, by appending the event. This is always the last write, together with any outbox insert.

The clinic row comes last, so it is held for the shortest time. PostgreSQL also detects a deadlock if one ever happens and cancels one side, which the backend retries.

### `call-next` with two nurses at once

```sql
update tickets t
set status = 'called', called_at = now()
where t.id = (
  select id from tickets
  where clinic_id = :clinic_id and status = 'arrived'
  order by queue_key, id
  limit 1
  for no key update skip locked
)
returning t.*;
```

The inner `select` finds the first **arrived** ticket in calling order and locks it. `skip locked` means: if another transaction already holds that row, take the next one instead of waiting.

The lock is `for no key update`, the same lock an ordinary `update` takes, not the stronger `for update`. The difference matters here. Inserting an event or an outbox row that points at a ticket puts a light lock on that ticket (PostgreSQL checks the foreign key that way). `for update` conflicts with that light lock, so `call-next` would skip a ticket just because, say, a delivery report for it was being saved. `for no key update` doesn't conflict with it. The check script shows both. Then, in the same transaction, the event is appended and the idempotency response is stored.

What the check script measured on PostgreSQL 16, with nurse A holding her transaction open for 2 seconds and nurse B tapping half a second later:

| Lock | Nurse A calls | Nurse B calls | B waited |
|---|---|---|---|
| `for no key update skip locked` | the first arrived | the next arrived | no |
| `for no key update` (no skip) | the first arrived | the next arrived | until A committed |

Both are safe: neither calls the same patient twice. When A commits, PostgreSQL re-checks B's row, sees it is no longer `arrived`, and moves to the next one. `skip locked` (the choice in PR #57) only removes the wait. Its cost is a small unfairness: if another short write that changes the first arrived ticket (a cancel, an override) holds it at that instant, `call-next` calls the next patient instead. The first stays first in line for the next tap. The window is a few milliseconds.

If no one has arrived, the update changes no rows and the API answers 204.

### The outbox key, and what really stops a second SMS

The unique key `(ticket_id, event_type, event_seq)` stops a **second row** for the same event. What stops a second "come now" message for the same visit is the guarded move from `waiting` to `notified`:

```sql
update tickets set status = 'notified', notified_at = now()
where id = :ticket_id and status = 'waiting';
```

Only the transaction that changes one row goes on to append the `notified` event and insert the outbox row. A second attempt finds the ticket already `notified` and does nothing. Each ticket moves to `notified` at most once, so it gets at most one "come now" row.

The worker takes due messages like this, one transaction per message:

```sql
select o.id, o.body, t.phone
from sms_outbox o join tickets t on t.id = o.ticket_id
where o.status = 'queued' and o.next_attempt_at <= now()
order by o.next_attempt_at, o.id
limit 1
for update of o skip locked;
```

Two workers take two different messages (shown by the check script). The worker sends, then updates the message, sets `hold_until` on first send, and appends an `sms_updated` event. The remaining gap is the one PR #57 already states: a crash after the provider accepts but before our commit can send the message again.

### Ticket moves and repeats

Each move is one guarded update: it only changes the row if the ticket is in a state the move is allowed from.

```sql
update tickets set status = 'seen', closed_at = now()
where id = :ticket_id and status = 'called'
returning *;
```

If no row changed, the backend reads the ticket. If it is already in the target state, or past it on the normal path, the answer is 200 with the ticket unchanged (the contract's repeat rule). Otherwise it is 409. Because the check and the change are one statement, two taps can't both make the move.

With an `Idempotency-Key`, the request starts by claiming the key:

```sql
insert into idempotency_keys (scope, key, request_hash)
values (:scope, :key, :request_hash)
on conflict (scope, key) do nothing
returning key;
```

- **One row back:** this request is first. It does the work, saves `status_code` and `response_body` in the same transaction, and commits.
- **No row back:** the key was used before. Read the stored row. If the hash matches, replay the stored response; if not, answer 422.
- **Two copies at the same instant:** the second `insert` waits on the first one's uncommitted row. When the first commits, the second sees the conflict and replays the stored response. The check script shows this with `call-next`'s 204. If the first rolls back, the second goes ahead as if it were first.

## Contract field map

Every field the contract returns, and where it comes from. *Derived* means computed when read.

| Contract field | Column, or how it is derived |
|---|---|
| `Clinic.id`, `name`, `ticketPrefix`, `staffOnDuty`, `graceMinutes` | `clinics.id`, `name`, `ticket_prefix`, `staff_on_duty`, `grace_minutes` |
| `Clinic.meanServiceMinutes` | Derived: mean of `closed_at - called_at` over recent `seen` tickets (`tickets_recently_seen`) |
| `Clinic.waitingCount` | Derived: a count of the clinic's tickets; which statuses count is open question 4 |
| `Clinic.status` | The `service_status` row, or null if there is none |
| `ServiceStatus.prescriberIn`, `note`, `updatedAt` | `service_status.prescriber_in`, `note`, `updated_at` |
| `Ticket.id`, `clinicId`, `channel`, `status`, `travelBand`, `language` | `tickets.id`, `clinic_id`, `channel`, `status`, `travel_band`, `language` |
| `Ticket.code` | Derived: `clinics.ticket_prefix`, a hyphen, and `tickets.number` padded to three digits |
| `Ticket.position` | Derived: row number by `(queue_key, id)` among `waiting`, `notified` and `arrived`; null otherwise |
| `Ticket.phoneMasked` | Derived in the backend from `tickets.phone` |
| `Ticket.predictedWait` | Derived by the predictor port (PR #56), from position, `staff_on_duty` and recent `seen` tickets |
| `Ticket.smsStatus`, `smsUpdatedAt` | `sms_outbox.status` and `updated_at` of the ticket's `notified` message; null if it has none. The backend sets `updated_at` on every status change |
| `Ticket.holdUntil`, `issuedAt`, `notifiedAt`, `arrivedAt`, `calledAt`, `closedAt`, `overridden` | `tickets.hold_until`, `issued_at`, `notified_at`, `arrived_at`, `called_at`, `closed_at`, `overridden` |
| `PublicTicket` (all fields) | The same as `Ticket`. Only `channel = 'web'` tickets are served (the backend's rule) |
| `Event.seq`, `type`, `ticketId`, `at`, `actor`, `actorId`, `data` | `events.seq`, `type`, `ticket_id`, `at`, `actor`, `actor_id`, `data` |
| `Idempotency-Key` header | `idempotency_keys.key`, scoped by `scope` |
| Staff bearer token | Looked up by its SHA-256 in `staff_users.token_sha256` |
| SMS delivery report `id`, `status`, `failureReason` | `sms_outbox.provider_message_id`, `status` (mapped as the contract says), `last_error` |
| `DeskTicketInput.waitOffSite` | Not stored: it picks the starting status (`waiting` or `arrived`) |
| `OverrideInput.reason`, `note`, `toPosition` | The `override` event's `data`; `toPosition` sets `tickets.queue_key` and `overridden` |
| USSD `sessionId`, `serviceCode`, `networkCode` | Not stored. The phone rule makes repeats safe without a session table |

### Derived, not stored

`position`, `code`, `phoneMasked`, `predictedWait`, `smsStatus`, `smsUpdatedAt`, `waitingCount` and `meanServiceMinutes` are computed when read. A stored copy would need updating every time something else changed (every call changes every position), and two copies can drift apart. One clinic's queue is small, so computing them costs little.

## Open questions

The contract leaves these open. Each has a proposed answer for the review.

1. **Who closes the day?** A no-show is never automatic, so a ticket left `waiting` or `notified` at closing stays active overnight. It then stays in the queue, ahead of the next day's tickets, and its phone can't join again. *Proposed:* staff close the day from the board, which cancels the rest with one `cancelled` event each. This needs a contract addition (an endpoint), so it is not designed here.
2. **What does the API answer for ticket 1000?** The counter refuses it, but the contract has no response for a clinic that is full for the day. *Proposed:* 409 with a problem saying the clinic has issued its 999 tickets for today.
3. **Where does `staffOnDuty` start for a new clinic?** The contract says nothing. This draft uses 1, so predictions work from the first ticket. With 0, every predicted wait is null until staff set it.
4. **Which tickets does `waitingCount` count?** *Proposed:* the same as `position`: `waiting`, `notified` and `arrived`.
5. **`meanServiceMinutes` before the day's first consultation.** The predictor interface (PR #56) leaves how many consultations to average to #51. With none yet today, it needs a starting value. *Proposed:* yesterday's mean, or a fixed 5 minutes for a new clinic.
6. **Does yesterday's service status still show today?** The contract calls it today's status. *Proposed:* show it only if `updated_at` is today in Accra, otherwise null.
7. **Who deletes idempotency keys after 24 hours, and is one `web` scope enough?** *Proposed:* the outbox worker deletes old keys once an hour. All anonymous joins share the `web` scope. That is safe as long as the page makes random keys (the contract suggests a UUID), and a mismatched request gets 422, not someone else's ticket.
8. **How long do we keep phone numbers?** Closed tickets keep the phone, which the evaluation doesn't need. *Proposed:* blank `tickets.phone` some days after a ticket closes, and state that in the ethics section (#14). The team should pick the number of days.
9. **Is the phone always E.164?** The rule compares phone numbers as exact text, so the USSD gateway and the web page must send the same format. The web input is validated as E.164. Whether Africa's Talking always sends the `+` should be checked in the sandbox (#53), and the backend should normalise if it doesn't.

10. **What happens to a queued SMS whose ticket has moved on?** If the patient arrives early or is cancelled before the message goes out (or before a retry), the worker query above would still send "come now". The contract's `smsStatus` has no value for a message that was dropped. *Proposed:* the worker only sends while the ticket is `notified`, and otherwise marks the message `failed` with no retry and `last_error` saying the ticket moved on. The contract review decides whether `smsStatus` needs its own value for that.

## How to check it

[`data-model-check.sh`](data-model-check.sh) loads every `create` block from this file into PostgreSQL 16 and runs 40 checks, including the races above with two sessions at once. It works in its own schema (`twen_dm_check`) and drops it at the end, so it never touches other tables.

```bash
docker run -d --rm --name twen-pg16 -e POSTGRES_PASSWORD=postgres -p 55432:5432 postgres:16
```

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:55432/postgres sh docs/architecture/data-model-check.sh
```

Every line should start with PASS, and the last line should read `--- 0 failed`. It needs `psql` on the path. CI does not run it. Once #49 adds the migration, its pytest suite takes over.
