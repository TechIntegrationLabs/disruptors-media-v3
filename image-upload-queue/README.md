# Image Upload Queue

This folder is used as a temporary staging area for images before they are uploaded to Cloudinary.

## How it works:

1. **Drop images here** that need to be uploaded to Cloudinary
2. The upload script will:
   - Analyze the image (dimensions, format, content)
   - Determine the appropriate Cloudinary folder
   - Upload with optimized settings
   - Add entry to the image tracking spreadsheet
   - Delete the local file after successful upload

## Supported formats:
- `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`
- `.mp4`, `.webm` (for videos)

## DO NOT:
- Store images here permanently
- Commit actual images to git (only .gitkeep and this README)
- Upload sensitive or private content

Files in this directory are automatically ignored by git (except .gitkeep and README.md).