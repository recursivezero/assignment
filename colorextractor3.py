from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import os
import json

def extract_colors(image_path, num_colors):
    #Load the images
    image = Image.open(image_path).convert('RGB')
    image = image.resize((200, 200))
    pixel_data = np.array(image)
    pixels = pixel_data.reshape(-1, 3)

    #KMeans 
    kmeans = KMeans(n_clusters=num_colors, random_state=42)
    kmeans.fit(pixels)

    unique_colors = np.unique(kmeans.cluster_centers_.astype(int), axis=0)
    color_list = [f"RGB({r}, {g}, {b})" for r, g, b in unique_colors]
    
    return color_list

def process_images(image_files, color_counts):
   
    results = {"images": []}
    for image_file, num_colors in zip(image_files, color_counts):
        if not os.path.isfile(image_file):
            results["images"].append({
                "image_name": os.path.basename(image_file),
                "error": "File does not exist."
            })
            continue

        # Extract colors
        try:
            colors = extract_colors(image_file, num_colors)
            results["images"].append({
                "image_name": os.path.basename(image_file),
                "colors": colors
            })
        except Exception as e:
            results["images"].append({
                "image_name": os.path.basename(image_file),
                "error": str(e)
            })

    return results

if __name__ == "__main__":
    # Sample images
    image_files = ["GroupA.jpg", "GroupB-1.jpg"]
    color_counts = [6, 9] 
    
    results = process_images(image_files, color_counts)
    print(json.dumps(results, indent=4))
