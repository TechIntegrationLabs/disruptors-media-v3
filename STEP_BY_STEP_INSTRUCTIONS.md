# GOOGLE APPS SCRIPT SETUP - STEP BY STEP

## 🚀 2-Minute Setup Instructions

### Step 1: Open Google Apps Script
**Click this link:** https://script.google.com/create

### Step 2: Replace the Default Code
1. **Select all default code** (Ctrl+A or Cmd+A)
2. **Delete it** (Delete key)
3. **Open the file:** `COPY_THIS_SCRIPT.txt` 
4. **Select all content** (Ctrl+A or Cmd+A)
5. **Copy** (Ctrl+C or Cmd+C)
6. **Paste into Google Apps Script** (Ctrl+V or Cmd+V)
7. **Save** (Ctrl+S or Cmd+S)
8. **Name the project:** "DM3 Blog Auto-Population"

### Step 3: Test the Script
1. **In the function dropdown**, select `testSync`
2. **Click the "Run" button** (▶️)
3. **Grant permissions when prompted:**
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced"
   - Click "Go to DM3 Blog Auto-Population (unsafe)"
   - Click "Allow"

### Step 4: Enable Automatic Sync
1. **In the function dropdown**, select `setupTriggers`
2. **Click the "Run" button** (▶️)
3. **Wait for "Execution completed"**

## ✅ That's It! Now It Runs Automatically

Your system will now:
- ✅ Sync every hour automatically
- ✅ Sync when you edit your blog content sheet
- ✅ Only sync approved posts (Approved? = YES)
- ✅ Create a "Blog Posts" tab in your main sheet
- ✅ Keep sync logs in "Sync Metadata" tab

## 🧪 Test Your Setup

1. **Open your blog content sheet**
2. **Set "Approved?" to "YES" for one blog post**
3. **Wait 5 minutes or run `testSync` again**
4. **Check your main sheet for new "Blog Posts" tab**
5. **Run your website:** `npm start`
6. **Visit:** http://localhost:3000/blog

## 🎯 You're Done Forever!

After this setup, you never need to touch Google Apps Script again. Just:

1. **Add blog posts** to your content sheet
2. **Set "Approved?" to "YES"** when ready to publish
3. **They appear on your website automatically**

## 🔧 Optional: Managing the System

### View Sync Status
- Check "Sync Metadata" tab in your main sheet
- See last sync time, number of posts synced, status

### Manual Sync (if needed)
- Go back to Google Apps Script
- Select `testSync` → Click "Run"

### Stop Automatic Sync (if needed)
- Go back to Google Apps Script  
- Select `removeTriggers` → Click "Run"

### Restart Automatic Sync
- Go back to Google Apps Script
- Select `setupTriggers` → Click "Run"

## 🆘 Troubleshooting

### "Permission denied" error
- Re-run Step 3 (testSync) to refresh permissions

### Posts not syncing
- Check "Approved?" column is exactly "YES" (not "yes" or "Y")
- Verify post has a title
- Check execution log in Google Apps Script

### Can't find execution log
- In Google Apps Script, click "Executions" on the left sidebar
- Look for recent runs of `testSync` or `syncBlogPosts`

**Need help?** The system logs everything, so any errors will show in the Google Apps Script execution log.