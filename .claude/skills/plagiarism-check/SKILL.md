---
name: plagiarism-check
description: Check written reports for plagiarism. Compares reports with each other and with reference files for shared passages, then searches the web for distinctive sentences. Use when the user asks to check reports, essays or documents for plagiarism, copying or overlapping text.
---

# Plagiarism check

This skill finds overlapping text in reports. It is a screening aid, not a verdict. Every match needs a human to review it.

## Inputs

- **Reports:** one or more `.txt` or `.md` files, or a folder of them. Convert `.docx` or `.pdf` files to text first (for example with the pdf or docx skill). Ask the user for the location if it isn't clear.
- **References (optional):** files or folders of source texts to compare against.

## Steps

1. **Local comparison.** Run:
   ```
   python3 .claude/skills/plagiarism-check/scripts/check_similarity.py <reports> [--ref <references>]
   ```
   The script compares every report with every other report and with every reference. For each pair it prints the percentage of the shorter text that overlaps and the shared passages, longest first.

2. **Web check.** Run the script again with `--queries 3` to get the three longest sentences from each report. For each query, use WebSearch with the sentence in quotation marks. If a result looks like a match, use WebFetch on the page to confirm the wording is the same. Run the searches in parallel where possible. Skip this step if the user only wants a local comparison.

3. **Report results.** For each flagged pair, give:
   - the two files,
   - the overlap percentage,
   - the longest shared passages, quoted briefly,
   - any web sources that matched, with links.

   Say plainly that matches can be legitimate, such as common phrases, quoted sources, citations, or shared assignment wording. Don't call anything plagiarism. Note that the web check only covers what search engines index. Paywalled journals, university repositories and private paper databases are not checked.

## Limits

- Paraphrased copying is missed. Only the exact wording (after lowercasing and removing punctuation) is compared.
- Matches of 8 or more words are reported by default. Use `--min-words` to change this. Shorter values give more noise.
- Text files only. Other formats must be converted first.
