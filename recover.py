import os, json, glob, shutil

history_dirs = [
    r"C:\Users\Daddoo\AppData\Roaming\Code\User\History",
    r"C:\Users\Daddoo\AppData\Roaming\Cursor\User\History",
    r"C:\Users\Daddoo\AppData\Roaming\VSCodium\User\History"
]
target_dir = r"C:\Users\Daddoo\OneDrive\Desktop\wadde kam\islam\public"
recovered = 0

for history_dir in history_dirs:
    if not os.path.exists(history_dir): continue
    for folder in os.listdir(history_dir):
        entries_path = os.path.join(history_dir, folder, "entries.json")
        if os.path.exists(entries_path):
            try:
                with open(entries_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                resource = data.get("resource", "")
                if "wadde" in resource and "islam/public/" in resource and resource.endswith(".html"):
                    filename = resource.split("/")[-1]
                    target_file = os.path.join(target_dir, filename)
                    
                    if os.path.exists(target_file) and os.path.getsize(target_file) == 0:
                        entries = data.get("entries", [])
                        if entries:
                            for entry in reversed(entries):
                                entry_id = entry.get("id")
                                source_file = os.path.join(history_dir, folder, entry_id)
                                if os.path.exists(source_file) and os.path.getsize(source_file) > 100:
                                    shutil.copy2(source_file, target_file)
                                    print(f"Recovered {filename} from {entry_id} in {history_dir}")
                                    recovered += 1
                                    break
            except Exception as e:
                continue

print(f"Total recovered: {recovered}")
