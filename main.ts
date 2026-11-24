import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one haiku about debugging, three lines in the
// 5-7-5 syllable shape (5 + 7 + 5 = 17 syllables), 82 characters.
const entry =
  "Cursor blinks at three\nthe log line lies, calm and still\ndawn finds the lost brace";

// Gate: 1-200 characters, not only whitespace (mirrors the competition
// gate), exactly three lines, no leading/trailing whitespace, no control
// characters other than the two line breaks between the lines.
const lines = entry.split("\n");
if (
  !/^[\s\S]{1,200}$/.test(entry) ||
  !/\S/.test(entry) ||
  entry !== entry.trim() ||
  lines.length !== 3 ||
  lines.some((line) => line !== line.trim() || line.length === 0) ||
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(entry)
) {
  throw new Error(
    "entry must be a 3-line haiku of 1-200 characters, not only whitespace, with no leading/trailing whitespace or control characters",
  );
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
