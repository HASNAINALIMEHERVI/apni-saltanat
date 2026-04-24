import os
import re

brain_dir = r"C:\Users\Daddoo\.gemini\antigravity\brain"
output_dir = r"C:\Users\Daddoo\OneDrive\Desktop\wadde kam\islam\public_recovered"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Find all overview.txt in brain dir
overview_files = []
for root, dirs, files in os.walk(brain_dir):
    for f in files:
        if f == "overview.txt":
            overview_files.append(os.path.join(root, f))

# We will look for view_file outputs and multi_replace_file_content outputs
# But an easier way is to just grep for <title>Apni Saltanat or similar markers,
# or look for the view_file blocks.
# In overview.txt, view_file returns:
# 1: <!DOCTYPE html>
# 2: <html lang="en">
# OR just standard blocks.

import random

# We will collect chunks starting with <!DOCTYPE html> to </html>
# and try to guess the filename based on content if possible, or just dump them.

recovered = 0
for fpath in overview_files:
    try:
        with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
            # Simple regex to extract line-numbered HTML blocks
            # view_file returns "1: <!DOCTYPE html>..."
            # Wait, not all files have <!DOCTYPE html>. Some might just be snippets.
            blocks = re.findall(r"(?:^|\n)(?:\d+:\s)?(<!DOCTYPE html>.*?(?:</html>|</body>))", content, re.IGNORECASE | re.DOTALL)
            
            if blocks:
                for block in blocks:
                    # Clean line numbers if present
                    clean_block = re.sub(r"^\d+:\s", "", block, flags=re.MULTILINE)
                    
                    # Guess filename:
                    fname = f"recovered_{random.randint(1000, 9999)}.html"
                    if "headerSearch" in clean_block and "categories.html" in clean_block:
                        if "products-list" in clean_block and "slider-section" in clean_block:
                            fname = "index.html"
                        elif "p-name" in clean_block and "shahi-rating-details" in clean_block:
                            fname = "product.html"
                        elif "id=\"loginLink\"" in clean_block and "login" in clean_block.lower():
                            fname = "login.html"
                    
                    with open(os.path.join(output_dir, fname), "w", encoding="utf-8") as outf:
                        outf.write(clean_block)
                    recovered += 1
    except Exception as e:
        pass

print(f"Recovered {recovered} potential HTML files into {output_dir}")
