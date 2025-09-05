# Cloudinary Assets Documentation - Disruptors Media Site

## Account Information
- **Cloud Name**: `dvcvxhzmt`
- **Account Status**: Active and configured in MCP setup
- **Integration**: Already integrated in DM3 React application

---

## Asset Inventory Table

Based on analysis of the DM3 documentation and React app code, here are the Cloudinary assets currently deployed:

### 🎥 Video Assets

| Asset Name | Cloudinary URL | Type | Usage | Dimensions | Description |
|-----------|----------------|------|-------|------------|-------------|
| Hero Desktop Video | `https://res.cloudinary.com/dvcvxhzmt/video/upload/f_auto,q_auto/videos/hero/desktop-background.mp4` | MP4 Video | Homepage Hero Background | 1920x1080+ | Desktop hero background video with professional studio scenes |
| Hero Mobile Video | `https://res.cloudinary.com/dvcvxhzmt/video/upload/f_auto,q_auto/videos/hero/mobile-background.mp4` | MP4 Video | Mobile Hero Background | 720x1280 | Mobile-optimized hero background video |
| Hero Desktop Poster | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto/videos/posters/hero-desktop-poster.jpg` | JPG Image | Video Poster/Fallback | 1920x1080 | Static fallback image for hero video |

### 🏢 Studio & Equipment Photography

| Asset Name | Cloudinary URL | Type | Usage | Dimensions | Description |
|-----------|----------------|------|-------|------------|-------------|
| Studio Wide Shot | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/overview/wide-angle-001.jpg` | JPG Image | Studio Services Page | 600x400 | Wide-angle shot of professional studio setup |
| Equipment Overview | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/equipment/setup-overview.jpg` | JPG Image | Studio Services Page | 600x400 | Professional recording equipment display |
| Recording Session | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/recording/session-example.jpg` | JPG Image | Studio Services Page | 600x400 | Live recording session example |
| Camera Equipment | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_80,h_80/photos/studio/equipment/cameras-detail.jpg` | JPG Image | Homepage Services Section | 80x80 | Close-up of BlackMagic podcast cameras |

### 🎨 UI Icons & Service Graphics

| Asset Name | Cloudinary URL | Type | Usage | Dimensions | Description |
|-----------|----------------|------|-------|------------|-------------|
| AI Technology Icon | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_80,h_80/ui/services/icons/ai-technology.png` | PNG Image | Homepage Services | 80x80 | AI/robot hand icon for technology services |
| Service Delivery Icon | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_80,h_80/ui/services/icons/service-delivery.png` | PNG Image | Homepage Services | 80x80 | Service delivery representation icon |
| Human Touch Icon | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_80,h_80/ui/services/icons/human-touch.png` | PNG Image | Homepage Services | 80x80 | Human hand icon for personal touch services |

### 🏢 Client Logos & Brand Assets

| Asset Name | Cloudinary URL | Type | Usage | Dimensions | Description |
|-----------|----------------|------|-------|------------|-------------|
| Primary Client Logo | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_150,h_75,c_fit/clients/featured/primary-client-001.png` | PNG Image | Client Showcase | 150x75 | Featured client brand logo |
| PayPal Logo | `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_150,h_75,c_fit/clients/featured/paypal-logo.png` | PNG Image | Client Showcase | 150x75 | PayPal official logo for client section |

---

## Asset Organization Structure

Based on the URLs and documentation analysis, your Cloudinary account follows this structure:

```
/dvcvxhzmt/
├── videos/
│   ├── hero/
│   │   ├── desktop-background.mp4
│   │   └── mobile-background.mp4
│   └── posters/
│       └── hero-desktop-poster.jpg
├── photos/
│   └── studio/
│       ├── overview/
│       │   └── wide-angle-001.jpg
│       ├── equipment/
│       │   ├── setup-overview.jpg
│       │   └── cameras-detail.jpg
│       └── recording/
│           └── session-example.jpg
├── ui/
│   └── services/
│       └── icons/
│           ├── ai-technology.png
│           ├── service-delivery.png
│           └── human-touch.png
└── clients/
    └── featured/
        ├── primary-client-001.png
        └── paypal-logo.png
```

---

## Additional Assets Referenced in Documentation

### 🏷️ Brand Assets (Planned/Expected)
Based on the documentation, these assets should exist or be uploaded:

- **Logo System**:
  - Primary logo (logo.svg)
  - Embossed logo (logo-emboss.png)
  - Mobile menu logo (mobile-menu-logo.png)
  - Gold banner logo (gold-logo-banner.png)

- **Client Logos by Industry**:
  - Healthcare: Community Cures, Wellness Way
  - Government: E-District
  - Media: BF4Reall
  - Food: Master Lu's

- **Photography Collections**:
  - Team member headshots
  - Portfolio work samples (work-1.jpg through work-6.jpg)
  - Case study headers

- **Background & Texture Elements**:
  - Main background texture (main-bg.jpg)
  - Section backgrounds
  - Gallery frames

---

## Asset Optimization Settings

All assets use Cloudinary's automatic optimization:

- **Format**: `f_auto` (WebP, AVIF when supported)
- **Quality**: `q_auto` (intelligent quality selection)
- **Responsive**: Dynamic sizing with `w_` and `h_` parameters
- **Cropping**: `c_fill`, `c_fit` based on usage needs

---

## Performance Benefits

✅ **Automatic Format Optimization**: WebP/AVIF for modern browsers
✅ **Intelligent Quality**: Optimal file size without quality loss
✅ **Global CDN Delivery**: Fast loading worldwide
✅ **Responsive Images**: Appropriate sizes for each device
✅ **Lazy Loading Support**: Built-in loading optimization

---

## Next Steps

To get a complete inventory of ALL assets in your Cloudinary account:

1. **Run the Custom Asset Explorer**: Use the script created in `/scripts/cloudinary-asset-explorer.js`
2. **Set API Credentials**: Export your Cloudinary API key and secret
3. **Execute**: Run `npm run cloudinary:explore` to get comprehensive asset list

This will provide the complete table with all assets including the "dmsite" folder if it exists.

---

*Last Updated: Based on DM3 documentation analysis and React app code review*