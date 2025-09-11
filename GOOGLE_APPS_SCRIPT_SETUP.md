# Google Apps Script Setup Guide for Auto Blog Population

## Overview

This guide will help you set up automatic synchronization between your blog content sheet and main sheet using Google Apps Script. This ensures that approved blog posts automatically appear in your main sheet for DM3 website integration.

## Sheet Configuration

### Source Sheet (Blog Content)
- **Sheet ID**: `1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA`
- **Tab Name**: `Content`
- **Purpose**: Where you create and manage blog content

### Destination Sheet (Main Sheet)
- **Sheet ID**: `1xkoXzGy4q-xkMZRQpqGCN4QR3o-FHOI_4YcTxBUDQYg`
- **Tab Name**: `Blog Posts` (will be created automatically)
- **Purpose**: DM3 website reads from this sheet

## Setup Instructions

### Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Name the project: `"DM3 Blog Auto-Population"`

### Step 2: Install the Script

1. Delete the default `Code.gs` content
2. Copy the entire content from `google-apps-script-auto-populate.js`
3. Paste it into the script editor
4. Save the project (Ctrl+S)

### Step 3: Grant Permissions

1. Click **"Run"** button next to `testSync` function
2. Grant permissions when prompted:
   - ✅ See, edit, create, and delete your spreadsheets
   - ✅ Send email as you
   - ✅ Connect to an external service

### Step 4: Set Up Automatic Triggers

1. In the script editor, select `setupTriggers` function
2. Click **"Run"**
3. This creates two triggers:
   - **Hourly sync**: Runs every hour automatically
   - **Edit trigger**: Runs when blog content sheet is edited

### Step 5: Test the Integration

1. Run `testSync` function manually
2. Check the main sheet for a new `Blog Posts` tab
3. Verify that approved posts appear in the tab
4. Check `Sync Metadata` tab for sync status

## How It Works

### Data Flow
1. **Blog Content Sheet** (`Content` tab) → **Main Sheet** (`Blog Posts` tab)
2. Only posts with `Approved? = YES` are synced
3. Data is transformed to match DM3 website requirements

### Column Mapping

| Blog Content Sheet | Main Sheet | Purpose |
|-------------------|------------|---------|
| Title | Title | Blog post title |
| Post URL | Content | Google Docs URL |
| Feature Image | Image | Featured image URL |
| Publish date | Post Date | Publication date |
| Client | Client | Author/client name |
| Primary Keyword | Primary Keyword | SEO keyword |
| (Generated) | Category | Auto-generated from keywords |
| (Generated) | Excerpt | Auto-generated description |
| (Generated) | Slug | URL-friendly version of title |
| (Auto) | Last Updated | Sync timestamp |

### Sync Triggers

1. **Hourly Sync**: Ensures regular updates
2. **Edit Trigger**: Immediate sync when content sheet changes
3. **Manual Sync**: Run `testSync()` anytime

## Managing the System

### View Sync Status
```javascript
// Run this function to see last sync info
getSyncStatus()
```

### Manual Sync
```javascript
// Force a sync right now
testSync()
```

### Stop Automatic Sync
```javascript
// Disable all triggers
removeTriggers()
```

### Restart Automatic Sync
```javascript
// Re-enable triggers
setupTriggers()
```

## Troubleshooting

### Common Issues

#### "Permission denied" errors
- Re-run `setupTriggers()` to refresh permissions
- Check that both sheets are accessible

#### Posts not appearing
- Verify `Approved?` column is set to "YES"
- Check `Publish date` is in the past
- Run `testSync()` manually

#### Sync not running automatically
- Check triggers in Script Editor → Triggers tab
- Re-run `setupTriggers()` if triggers are missing

### Debug Steps

1. **Check Script Logs**:
   - Script Editor → Executions tab
   - Look for error messages

2. **Verify Sheet Access**:
   - Ensure both sheets are accessible
   - Check sheet IDs in script

3. **Test Manual Sync**:
   - Run `testSync()` function
   - Check console output

## Advanced Configuration

### Custom Categories
Modify `determineCategoryFromKeyword()` function to add custom category rules:

```javascript
function determineCategoryFromKeyword(keyword, title) {
  const searchText = `${keyword} ${title}`.toLowerCase();
  
  // Add your custom rules here
  if (searchText.includes('your-keyword')) return 'your-category';
  
  // ... existing rules
}
```

### Custom Excerpt Generation
Modify `createExcerptFromTitle()` function:

```javascript
function createExcerptFromTitle(title, keyword) {
  // Your custom excerpt logic here
  return `Your custom excerpt for: ${title}`;
}
```

### Sync Frequency
Change sync frequency in `setupTriggers()`:

```javascript
// Every 30 minutes
ScriptApp.newTrigger('syncBlogPosts')
  .timeBased()
  .everyMinutes(30)
  .create();

// Daily at 9 AM
ScriptApp.newTrigger('syncBlogPosts')
  .timeBased()
  .everyDays(1)
  .atHour(9)
  .create();
```

## Monitoring

### Sync Metadata
The script creates a `Sync Metadata` tab with:
- Last sync timestamp
- Number of posts synced
- Sync status (Success/Error)

### Email Notifications (Optional)
Add email notifications to `syncBlogPosts()` function:

```javascript
// At end of syncBlogPosts() function
GmailApp.sendEmail(
  'your-email@domain.com',
  'Blog Sync Complete',
  `Successfully synced ${approvedPosts.length} blog posts`
);
```

## Security Notes

- Script only accesses the specified Google Sheets
- No external API calls or data sharing
- Runs under your Google account permissions
- Can be disabled/deleted anytime

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review script execution logs
3. Verify sheet permissions and structure
4. Run manual test sync to isolate issues