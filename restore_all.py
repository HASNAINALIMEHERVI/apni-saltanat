import os
import json
import shutil
import time

public_dir = r"C:\Users\Daddoo\OneDrive\Desktop\wadde kam\islam\public"
history_dir = r"C:\Users\Daddoo\AppData\Roaming\Code\User\History"

empty_files = []
for f in os.listdir(public_dir):
    if f.endswith('.html'):
        p = os.path.join(public_dir, f)
        if os.path.getsize(p) == 0:
            empty_files.append(f)

print("Empty files found:", empty_files)

# Find histories
histories = {}
for root, dirs, files in os.walk(history_dir):
    if 'entries.json' in files:
        entries_path = os.path.join(root, 'entries.json')
        try:
            with open(entries_path, 'r', encoding='utf-8') as ef:
                data = json.load(ef)
                res = data.get('resource', '')
                if 'islam/public' in res.replace('\\', '/') or 'islam\\public' in res:
                    fname = os.path.basename(res)
                    if fname in empty_files:
                        entries = data.get('entries', [])
                        # get the latest entry that is >0 in size
                        # entries list has keys 'id' (filename of backup), 'timestamp'
                        entries.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
                        for e in entries:
                            backup_path = os.path.join(root, e['id'])
                            if os.path.exists(backup_path) and os.path.getsize(backup_path) > 0:
                                histories[fname] = backup_path
                                break
        except:
            pass

for fname, backup_path in histories.items():
    dest = os.path.join(public_dir, fname)
    shutil.copy2(backup_path, dest)
    print(f"Restored {fname} from {backup_path}")

# Check remaining
for f in empty_files:
    if f not in histories:
        print(f"Could NOT find history for {f}")
