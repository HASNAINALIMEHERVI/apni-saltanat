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

for fname, hits in results.items():
    print(f"\n=== {fname} ===", flush=True)
    for lno, text in hits:
        safe = text.encode('ascii', errors='replace').decode('ascii')
        print(f"  {lno}: {safe}", flush=True)
