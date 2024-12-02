import os
import json

def create_directory_structure_json(root_dir, relative_path, item):
    data = []
    item_path = os.path.join(root_dir, relative_path)
    print("Scanning", item_path)
    if not os.path.isdir(item_path):
        if item != "structure.py":
            data.append({"name": item, "path": item_path, "relative": relative_path})
        return data
    print("Directory detected")
    for item in os.listdir(item_path):
        relative_path_current_item = relative_path
        if relative_path_current_item == "":
            relative_path_current_item = item
        else:
            relative_path_current_item += "\\" + item
        print("Hit", item_path)
        data += create_directory_structure_json(root_dir, relative_path_current_item, item)
    
    return data

def save_json(data, output_file):
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)

source_directory = input("source directory: ")
output_json_file = input("output file: ")

directory_structure = create_directory_structure_json(source_directory, "", "")
save_json(directory_structure, output_json_file)