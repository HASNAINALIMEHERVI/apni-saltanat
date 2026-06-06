import os, re

roman_urdu = re.compile(
    r'(Sardaar|Shahi|sultanat|Saltanat|karo|nahi|mubarak|paigam|tasdeeq|ghalti|tasveer|zaroori|kamyabi|waqe|Sardaar|Mubarak|Salam|Aapka|ho gaya|kar diya|aap|ghalti|hain!|Sultan|karna|chahte|wapas|zaroor)',
    re.IGNORECASE
)

results = {}
for fname in sorted(os.listdir('.')):
    if fname.endswith('.html'):
        lines = open(fname, encoding='utf-8-sig', errors='replace').readlines()
        hits = []
        for i, l in enumerate(lines, 1):
            if roman_urdu.search(l):
                hits.append((i, l.strip()[:200]))
        if hits:
            results[fname] = hits

with open('urdu_matches_utf8.txt', 'w', encoding='utf-8') as f:
    for fname, hits in results.items():
        f.write(f"\n=== {fname} ===\n")
        for lno, text in hits:
            f.write(f"  {lno}: {text}\n")
