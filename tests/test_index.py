"""Checks scripts/index.py against a throwaway folder. Run: python3 -m unittest discover -s tests"""
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))
import index  # noqa: E402


class IndexTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        index.ROOT = Path(self.tmp.name)
        for folder in index.FOLDERS:
            (index.ROOT / folder).mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def write(self, rel, text):
        (index.ROOT / rel).write_text(text, encoding="utf-8")

    def test_builds_sorted_grouped_index_then_check_passes(self):
        self.write("knowledge/b.md", "---\ntitle: Burndown chart\ntags: [agile]\nsource: L3\n---\nbody")
        self.write("knowledge/a.md", "---\ntitle: Availability | MTBF\ntags: [quality, maths]\nsource: L9\n---\n")
        self.write("knowledge/TEMPLATE.md", "not front matter")  # skipped
        self.assertEqual(index.main(check=False), 0)
        text = (index.ROOT / "knowledge/index.md").read_text()
        self.assertIn("## agile", text)
        self.assertIn("[Availability \\| MTBF](a.md)", text)  # pipe escaped
        self.assertLess(text.index("## agile"), text.index("## quality"))
        self.assertEqual(index.main(check=True), 0)

    def test_check_fails_when_stale_or_malformed(self):
        index.main(check=False)
        self.write("changes/2026-11-14-x.md", "---\ntitle: X\ndate: 2026-11-14\nowner: Liza\nai_used: no\n---\n")
        self.assertEqual(index.main(check=True), 1)  # stale
        index.main(check=False)
        self.assertEqual(index.main(check=True), 0)
        self.write("changes/bad.md", "---\ntitle: No owner\ndate: 2026-11-15\nai_used: yes\n---\n")
        self.assertEqual(index.main(check=True), 1)  # missing owner
        self.write("changes/bad.md", "no front matter")
        self.assertEqual(index.main(check=True), 1)

    def test_plans_sort_by_issue_number(self):
        self.write("plans/10-z.md", "---\nissue: 10\ntitle: Z\nworkstream: qa\nstatus: todo\n---\n")
        self.write("plans/2-a.md", "---\nissue: 2\ntitle: A\nworkstream: ux\nstatus: todo\n---\n")
        index.main(check=False)
        text = (index.ROOT / "plans/index.md").read_text()
        self.assertLess(text.index("(2-a.md)"), text.index("(10-z.md)"))


if __name__ == "__main__":
    unittest.main()
