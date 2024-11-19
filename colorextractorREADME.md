# ColorFinder---Python

# Color Extractor:
A Python script that extracts the dominant colors from images using KMeans clustering. The extracted colors are returned in a structured JSON format.

## Features:
-Extracts dominant colors from JPEG images.

-Outputs colors in a human-readable JSON format.

## Requirements:
This project requires Python 3.x and the following Python packages:
- Pillow
- NumPy
- scikit-learn

## Installation:
 **Clone the Repository**:
  ```bash
  git clone <https://github.com/kavish0302/ColorFinder---Python>
   cd <Color_Finder>
 ```

 **Install Required Packages**:
  ```bash
  pip3 install Pillow numpy scikit-learn
  ```

## Usage:
Prepare Your Images:
Place your images in the same directory as the script. The script currently looks for Sample1.jpg and Sample2.jpg.

Run the Script:
Open your terminal, navigate to the directory containing the script, and run:
```bash
python3 colorextractor.py
 ```

## View the Output:
The script will print the extracted colors in JSON format to the console. The output will look something like this:

```json
 {
    "images": [
        {
            "image_name": "Sample1.jpg",
            "colors": [
                "RGB(123, 45, 67)",
                "RGB(255, 220, 180)",
                "RGB(100, 120, 130)",
                "RGB(90, 60, 40)"
            ]
        },
        {
            "image_name": "Sample2.jpg",
            "colors": [
                "RGB(200, 150, 100)",
                "RGB(50, 80, 90)",
                "RGB(255, 0, 0)",
                "RGB(0, 255, 0)"
            ]
        }
    ]
}
  ```

## Testing:
To test the script, you can use any JPEG images. Ensure they are named Sample1.jpg and Sample2.jpg, or modify the image_paths list in the script to point to your images.

## Acknowledgments:
-This project uses the Pillow library for image processing.

-The NumPy library is used for numerical operations.

-The scikit-learn library is used for KMeans clustering.



