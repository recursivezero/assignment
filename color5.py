from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import cv2
import os
import json

def extract_colors(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Could not read image: {image_path}")
    
    
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Resize the image 
    max_dimension = 800
    height, width = image_rgb.shape[:2]
    scale = min(max_dimension/width, max_dimension/height)
    new_width = int(width * scale)
    new_height = int(height * scale)
    working_image = cv2.resize(image_rgb, (new_width, new_height))
    
    is_group_b = os.path.basename(image_path) == "GroupB-1.jpg"
    
    hsv_image = cv2.cvtColor(working_image, cv2.COLOR_RGB2HSV)
    
    masks = []
    
    # Divide the image into regions
    region_height = new_height // 3
    region_width = new_width // 3
    
    for i in range(3):
        for j in range(3):
            top = i * region_height
            bottom = (i + 1) * region_height
            left = j * region_width
            right = (j + 1) * region_width
            
            region = working_image[top:bottom, left:right]
            hsv_region = hsv_image[top:bottom, left:right]
            
            if is_group_b:
                lower_thresh = np.array([0, 15, 40])
                upper_thresh = np.array([180, 235, 250])
            else:
                lower_thresh = np.array([0, 20, 50])
                upper_thresh = np.array([180, 255, 255])
            
            mask = cv2.inRange(hsv_region, lower_thresh, upper_thresh)
            
            # Apply morphological operations
            kernel = np.ones((5,5), np.uint8) if is_group_b else np.ones((3,3), np.uint8)
            mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
            mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
            
            if np.sum(mask) > 100: 
                full_mask = np.zeros((new_height, new_width), dtype=np.uint8)
                full_mask[top:bottom, left:right] = mask
                masks.append(full_mask)
    
    # Extract colors from masked regions
    colors = []
    for mask in masks:
        masked_img = cv2.bitwise_and(working_image, working_image, mask=mask)
        non_zero = masked_img[mask > 0]
        
        if len(non_zero) > 0:
            if is_group_b:
                color = np.median(non_zero, axis=0)
                colors.append(color)
                pixels = non_zero.reshape(-1, 3)
                pixel_counts = np.unique(pixels, axis=0, return_counts=True)
                most_frequent_color = pixel_counts[0][np.argmax(pixel_counts[1])]
                colors.append(most_frequent_color)
            else:
                pixels = non_zero.reshape(-1, 3)
                kmeans = KMeans(n_clusters=1, random_state=42, n_init=10)
                kmeans.fit(pixels)
                color = kmeans.cluster_centers_[0]
                colors.append(color)
    
    colors = np.array(colors)
    
    n_clusters = 10 if is_group_b else 9
    if len(colors) < n_clusters:
        pixels = working_image.reshape(-1, 3)
        
        # Use K-means to find additional colors
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        kmeans.fit(pixels)
        new_colors = kmeans.cluster_centers_
        colors = np.vstack([colors, new_colors])
    
    kmeans = KMeans(
        n_clusters=n_clusters,
        random_state=42,
        n_init=20 if is_group_b else 10,
        max_iter=300
    )
    
    kmeans.fit(colors)
    final_colors = kmeans.cluster_centers_
    
    # Format results
    result_colors = []
    unique_colors = set()
    
    for color in final_colors:
        rgb_values = np.clip(color, 0, 255)
        rgb_tuple = tuple(map(int, rgb_values))
        
        if is_group_b:
            color_key = f"{rgb_tuple[0]//2},{rgb_tuple[1]//2},{rgb_tuple[2]//2}"
        else:
            color_key = f"{rgb_tuple[0]//5},{rgb_tuple[1]//5},{rgb_tuple[2]//5}"
        
        if color_key not in unique_colors:
            unique_colors.add(color_key)
            result_colors.append(
                f"RGB({rgb_tuple[0]}, {rgb_tuple[1]}, {rgb_tuple[2]})"
            )
    result_colors.sort()
    
    return result_colors[:n_clusters]



def create_grid_mask(image, grid_size=(3,3), min_object_size=1000):
    height, width = image.shape[:2]
    cell_height = height // grid_size[0]
    cell_width = width // grid_size[1]
    
    # Convert to HSV
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    
    lower_white = np.array([0, 0, 180])  
    upper_white = np.array([180, 40, 255])  
    white_mask = cv2.inRange(hsv, lower_white, upper_white)
    
    object_mask = np.zeros((height, width), dtype=np.uint8)
    objects_found = []
    
    kernel = np.ones((5,5), np.uint8)  
    
    for i in range(grid_size[0]):
        for j in range(grid_size[1]):
            top = i * cell_height
            bottom = (i + 1) * cell_height
            left = j * cell_width
            right = (j + 1) * cell_width
            
            cell = image[top:bottom, left:right]
            cell_white_mask = white_mask[top:bottom, left:right]
            
            # Mask processing
            cell_object_mask = cv2.bitwise_not(cell_white_mask)
            cell_object_mask = cv2.morphologyEx(cell_object_mask, cv2.MORPH_OPEN, kernel)
            cell_object_mask = cv2.morphologyEx(cell_object_mask, cv2.MORPH_CLOSE, kernel)
            cell_object_mask = cv2.dilate(cell_object_mask, kernel, iterations=1)
            
            contours, _ = cv2.findContours(cell_object_mask, 
                                         cv2.RETR_EXTERNAL, 
                                         cv2.CHAIN_APPROX_SIMPLE)
            
            for contour in contours:
                area = cv2.contourArea(contour)
                if area > min_object_size:
                    adjusted_contour = contour + [left, top]
                    
                    mask = np.zeros_like(cell_object_mask)
                    cv2.drawContours(mask, [contour], -1, 255, -1)
                    
                    masked_cell = cv2.bitwise_and(cell, cell, mask=mask)
                    non_zero = masked_cell[mask > 0]
                    if len(non_zero) > 0:
                        median_color = np.median(non_zero, axis=0)
                    else:
                        continue
                    
                    objects_found.append({
                        'contour': adjusted_contour,
                        'color': median_color,
                        'area': area
                    })
                    
                    cv2.drawContours(object_mask, [adjusted_contour], -1, 255, -1)
    
    objects_found.sort(key=lambda x: x['area'], reverse=True)
    return object_mask, objects_found


def process_images(image_files):
    results = {"images": []}
    
    for image_file in image_files:
        if not os.path.isfile(image_file):
            results["images"].append({
                "image_name": os.path.basename(image_file),
                "error": "File does not exist."
            })
            continue

        try:
            colors = extract_colors(image_file)
            results["images"].append({
                "image_name": os.path.basename(image_file),
                "colors": colors,
                #"number_of_colors_detected": len(colors)
            })
        except Exception as e:
            results["images"].append({
                "image_name": os.path.basename(image_file),
                "error": str(e)
            })

    return results

if __name__ == "__main__":
    image_files = ["GroupA.jpg","GroupB-1.jpg"]
    results = process_images(image_files)
    print(json.dumps(results, indent=4))
