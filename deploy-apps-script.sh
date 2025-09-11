#!/bin/bash

# Google Apps Script Deployment Helper
echo "=== DM3 Blog Auto-Sync Deployment ==="
echo ""
echo "This script will help you set up the Google Apps Script."
echo ""
echo "STEP 1: Opening Google Apps Script..."
echo "When the page opens:"
echo "1. Click 'New Project'"
echo "2. Name it: 'DM3 Blog Auto-Population'"
echo ""
read -p "Press Enter to open Google Apps Script..." 

# Open Google Apps Script
if command -v xdg-open > /dev/null; then
    xdg-open "https://script.google.com/home/projects/create"
elif command -v open > /dev/null; then
    open "https://script.google.com/home/projects/create"
elif command -v start > /dev/null; then
    start "https://script.google.com/home/projects/create"
else
    echo "Please manually open: https://script.google.com/home/projects/create"
fi

echo ""
echo "STEP 2: Copy the Script"
echo "The script content is in: google-apps-script-auto-populate.js"
echo ""
echo "1. Delete the default code in the editor"
echo "2. Copy ALL content from google-apps-script-auto-populate.js"
echo "3. Paste it into the Apps Script editor"
echo "4. Save (Ctrl+S or Cmd+S)"
echo ""
read -p "Press Enter after you've pasted and saved the script..."

echo ""
echo "STEP 3: Test the Script"
echo "1. In the function dropdown, select 'testSync'"
echo "2. Click the 'Run' button"
echo "3. Grant permissions when prompted (click Advanced > Go to project)"
echo "4. Check the execution log at the bottom"
echo ""
read -p "Press Enter after running testSync successfully..."

echo ""
echo "STEP 4: Enable Automatic Sync"
echo "1. In the function dropdown, select 'setupTriggers'"
echo "2. Click the 'Run' button"
echo "3. This creates hourly sync + edit triggers"
echo ""
read -p "Press Enter after running setupTriggers..."

echo ""
echo "STEP 5: Opening Your Sheets to Verify"
echo ""
read -p "Press Enter to open your Main Sheet..."

# Open Main Sheet
if command -v xdg-open > /dev/null; then
    xdg-open "https://docs.google.com/spreadsheets/d/1xkoXzGy4q-xkMZRQpqGCN4QR3o-FHOI_4YcTxBUDQYg/edit"
elif command -v open > /dev/null; then
    open "https://docs.google.com/spreadsheets/d/1xkoXzGy4q-xkMZRQpqGCN4QR3o-FHOI_4YcTxBUDQYg/edit"
elif command -v start > /dev/null; then
    start "https://docs.google.com/spreadsheets/d/1xkoXzGy4q-xkMZRQpqGCN4QR3o-FHOI_4YcTxBUDQYg/edit"
fi

echo ""
echo "CHECK YOUR MAIN SHEET:"
echo "✓ Look for new 'Blog Posts' tab"
echo "✓ Approved posts should be there"
echo "✓ Check 'Sync Metadata' tab for last sync info"
echo ""
echo "✅ SETUP COMPLETE!"
echo ""
echo "Your blog posts will now:"
echo "- Sync automatically every hour"
echo "- Sync when you edit the content sheet"
echo "- Only sync posts marked as 'Approved? = YES'"
echo ""
echo "To test your website:"
echo "npm start"
echo "Then visit: http://localhost:3000/blog"
echo ""