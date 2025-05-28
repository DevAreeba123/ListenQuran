$(document).ready(function () {
  console.log("Website Loaded - Asnah Tech");
});
"""

# Write files to project directory
with open(os.path.join(project_dir, "index.html"), "w") as f:
    f.write(html_content)

with open(os.path.join(project_dir, "style.css"), "w") as f:
    f.write(css_content)

with open(os.path.join(project_dir, "script.js"), "w") as f:
    f.write(js_content)

# Create zip file
zip_path = "/mnt/data/AsnahTechWebsite.zip"
with ZipFile(zip_path, 'w') as zipf:
    zipf.write(os.path.join(project_dir, "index.html"), arcname="index.html")
    zipf.write(os.path.join(project_dir, "style.css"), arcname="style.css")
    zipf.write(os.path.join(project_dir, "script.js"), arcname="script.js")

