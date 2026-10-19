#!/usr/bin/env python3
"""Compare text reports for overlapping passages.

Usage:
  check_similarity.py REPORT_PATH [REPORT_PATH ...] [--ref REF_PATH ...]
                      [--min-words N] [--queries N]

REPORT_PATH and REF_PATH can be files or folders. Folders are scanned for
.txt and .md files. Every report is compared with every other report, and
with every reference file. Reference files are only compared against
reports, not against each other.

--queries N prints the N longest sentences of each report, to use as
search queries for the web check.
"""

import argparse
import difflib
import pathlib
import re
import sys

TEXT_SUFFIXES = {".txt", ".md"}
WORD_RE = re.compile(r"[a-z0-9']+")
SENTENCE_RE = re.compile(r"[^.!?\n]+[.!?]")


def collect_files(paths):
    files = []
    for raw in paths:
        path = pathlib.Path(raw)
        if path.is_dir():
            files.extend(sorted(p for p in path.rglob("*") if p.suffix.lower() in TEXT_SUFFIXES))
        elif path.is_file():
            files.append(path)
        else:
            sys.exit(f"Not found: {raw}")
    return files


def read_words(path):
    text = path.read_text(encoding="utf-8", errors="replace").lower()
    return WORD_RE.findall(text)


def find_passages(a_words, b_words, min_words):
    matcher = difflib.SequenceMatcher(None, a_words, b_words, autojunk=False)
    passages = []
    for block in matcher.get_matching_blocks():
        if block.size >= min_words:
            passages.append((block.a, block.b, block.size))
    return passages


def excerpt(words, start, size, limit=25):
    shown = words[start:start + size]
    if len(shown) > limit:
        return " ".join(shown[:limit]) + " ..."
    return " ".join(shown)


def compare(a_path, b_path, min_words):
    a_words = read_words(a_path)
    b_words = read_words(b_path)
    if not a_words or not b_words:
        return None
    passages = find_passages(a_words, b_words, min_words)
    matched = sum(size for _, _, size in passages)
    percent = 100 * matched / min(len(a_words), len(b_words))
    return percent, passages, a_words, b_words


def print_pair(a_path, b_path, result):
    percent, passages, a_words, _ = result
    print(f"\n=== {a_path}  vs  {b_path}: {percent:.1f}% of the shorter text overlaps ===")
    if not passages:
        print("  No shared passages above the minimum length.")
        return
    for a_start, _, size in sorted(passages, key=lambda p: -p[2]):
        print(f"  [{size} words] \"{excerpt(a_words, a_start, size)}\"")


def print_queries(path, count):
    text = path.read_text(encoding="utf-8", errors="replace")
    sentences = [s.strip() for s in SENTENCE_RE.findall(text)]
    sentences = [s for s in sentences if len(WORD_RE.findall(s.lower())) >= 12]
    sentences.sort(key=lambda s: -len(WORD_RE.findall(s.lower())))
    print(f"\nSearch queries for {path}:")
    for sentence in sentences[:count]:
        print(f"  \"{sentence}\"")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("reports", nargs="+", help="report files or folders to check")
    parser.add_argument("--ref", nargs="*", default=[], help="reference files or folders to compare against")
    parser.add_argument("--min-words", type=int, default=8, help="shortest shared passage to report (default 8)")
    parser.add_argument("--queries", type=int, default=0, help="print N long sentences per report for web search")
    args = parser.parse_args()

    reports = collect_files(args.reports)
    refs = collect_files(args.ref)
    if not reports:
        sys.exit("No .txt or .md reports found.")

    print(f"Checking {len(reports)} report(s) against each other and {len(refs)} reference file(s).")

    for i, a_path in enumerate(reports):
        for b_path in reports[i + 1:]:
            result = compare(a_path, b_path, args.min_words)
            if result:
                print_pair(a_path, b_path, result)
        for ref_path in refs:
            result = compare(a_path, ref_path, args.min_words)
            if result:
                print_pair(a_path, ref_path, result)

    if args.queries:
        for path in reports:
            print_queries(path, args.queries)


if __name__ == "__main__":
    main()
