#!/bin/bash

echo "🚀 Opening Google Apps Script Setup Links..."
echo ""

# Function to open URL based on OS
open_url() {
    if command -v xdg-open > /dev/null; then
        xdg-open "$1"
    elif command -v open > /dev/null; then
        open "$1"
    elif command -v start > /dev/null; then
        start "$1"
    else
        echo "Please manually open: $1"
    fi
}

echo "1️⃣ Opening Google Apps Script..."
open_url "https://script.google.com/create"

sleep 2

echo "2️⃣ Opening Blog Content Sheet..."
open_url "https://docs.google.com/spreadsheets/d/1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA/edit"

sleep 2

echo "3️⃣ Opening Main Sheet..."
open_url "https://docs.google.com/spreadsheets/d/1xkoXzGy4q-xkMZRQpqGCN4QR3o-FHOI_4YcTxBUDQYg/edit"

echo ""
echo "✅ All links opened!"
echo ""
echo "📋 Next Steps:"
echo "1. In Google Apps Script tab: Follow STEP_BY_STEP_INSTRUCTIONS.md"
echo "2. In Blog Content Sheet tab: Set 'Approved?' to 'YES' for test post"
echo "3. In Main Sheet tab: Look for new 'Blog Posts' tab after sync"
echo ""
echo "🎯 Ready to copy script from: COPY_THIS_SCRIPT.txt"