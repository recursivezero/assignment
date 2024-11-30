import os
import json
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

def extract_colors(image_path, num_colors=5):
    #Load the images
    image = Image.open(image_path)
    image = image.convert('RGB')

    image = image.resize((100, 100))
    pixel_data = np.array(image)
    pixels = pixel_data.reshape(-1, 3)

    #KMeans
    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(pixels)

    #RGB values of the cluster
    colors = kmeans.cluster_centers_.astype(int)

    #Convert rgb to json
    color_list = [f"RGB({r}, {g}, {b})" for r, g, b in colors]
    
    return color_list

def main(image_files):
    response = {"images": []}

    for image_file in image_files:
        if not os.path.isfile(image_file):
            response["images"].append({"image_name": os.path.basename(image_file), "error": "File does not exist."})
            continue

        #Extracting colors
        colors = extract_colors(image_file)

        #Prepare json format
        image_response = {
            "image_name": os.path.basename(image_file),
            "colors": colors
        }
        response["images"].append(image_response)
    
    return json.dumps(response, indent=4)

if __name__ == "__main__":
    image_paths = ["GroupA.jpg", "GroupB-1.jpg"]  #sample images
    result = main(image_paths)
    print(result)