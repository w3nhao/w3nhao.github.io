import os
import json
from datetime import datetime

# Load or initialize metadata
def load_metadata(filepath):
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

# Save metadata
def save_metadata(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f)

def process_mathjax(content):
    content = content.replace('\\\\', '\\\\\\\\')  # Replace 2 \ with 4 \
    content = content.replace('x_t', 'x\\_t')      # Replace x_t with x\_t
    content = content.replace('\\[', '\\\\[')      # Replace \[ with \\[
    content = content.replace('\\]', '\\\\]')      # Replace \] with \\]
    content = content.replace('\\(', '\\\\(')      # Replace \( with \\(
    content = content.replace('\\)', '\\\\)')      # Replace \) with \\)
    return content

def generate_jekyll_filename(filename):
    today = datetime.today().strftime('%Y-%m-%d')
    
    # Remove .md or .markdown extension and replace spaces with dashes
    base_name = os.path.splitext(filename)[0].replace(' ', '-')
    
    return f"{today}-{base_name}.md"

def post_process_directory(source_dir, target_dir, metadata_path):
    metadata = load_metadata(metadata_path)

    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.md') or file.endswith('.markdown'):
                source_file_path = os.path.join(root, file)

                # Check file modification time
                file_mtime = os.path.getmtime(source_file_path)
                
                # If the file is not in metadata or it's updated, process it
                if file not in metadata or metadata[file]['mtime'] < file_mtime:
                    with open(source_file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    processed_content = process_mathjax(content)

                    # If the file is new, assign a new date
                    if file not in metadata:
                        release_date = datetime.today().strftime('%Y-%m-%d')
                    else:  # Else, preserve the original release date
                        release_date = metadata[file]['release_date']

                    new_filename = f"{release_date}-{os.path.splitext(file)[0].replace(' ', '-')}.md"
                    target_path = os.path.join(target_dir, new_filename)

                    with open(target_path, 'w', encoding='utf-8') as f:
                        f.write(processed_content)

                    # Update metadata
                    metadata[file] = {
                        'release_date': release_date,
                        'mtime': file_mtime
                    }

    save_metadata(metadata_path, metadata)

# Point this to your drafts, _posts directories, and a metadata file
post_process_directory('drafts', '_posts', 'metadata.json')