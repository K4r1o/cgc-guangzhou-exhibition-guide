import fitz
import os

pdf_path = r'C:\Users\chang\.gemini\antigravity\brain\44666740-4905-4b3a-bd04-e17e96c86aa1\media__1782038236571.pdf'
out_dir = r'C:\Users\chang\.gemini\antigravity\scratch\guangzhou-exhibition-app\src\assets\images'

doc = fitz.open(pdf_path)
for page_index in range(len(doc)):
    page = doc[page_index]
    image_list = page.get_images()
    
    for image_index, img in enumerate(image_list, start=1):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = f"page{page_index+1}_{image_index}.{image_ext}"
        image_filepath = os.path.join(out_dir, image_filename)
        with open(image_filepath, "wb") as f:
            f.write(image_bytes)
        print(f"Saved {image_filepath}")
