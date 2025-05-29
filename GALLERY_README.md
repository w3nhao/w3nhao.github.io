# 📸 Instagram-Style Adventure Gallery

A modern, responsive photo gallery system for your Jekyll blog with automatic image import utilities.

## ✨ Features

- **Instagram-style responsive grid layout**
- **Masonry layout** for optimal space usage
- **Lightbox modal** with keyboard navigation
- **Lazy loading** for better performance
- **Mobile-optimized** responsive design
- **Automatic image import** utilities
- **Caption overlay** effects
- **Smooth animations** and hover effects

## 🚀 Quick Start

### 1. Add New Images

Simply drop your images into the `public/img/gallery/` directory. For best results, use this naming convention:
```
YYYYMMDD_description.jpg
```
Example: `20241223_hiking_summit.jpg`

### 2. Generate Gallery HTML

#### Option A: Automatic Import (Recommended)
```bash
# Windows
./import-gallery.bat

# Mac/Linux
node _utils/gallery-import.js
```

#### Option B: Interactive Mode
```bash
node _utils/gallery-import.js interactive
```

#### Option C: Manual Browser Console
Open your gallery page and run:
```javascript
// Example: Generate HTML for specific images
const images = [
  '/public/img/gallery/image1.jpg',
  '/public/img/gallery/image2.jpg'
];
const html = galleryUtils.generateGalleryHTML(images, '🏔️ Mountain Adventure');
console.log(html);
```

### 3. Update Your Page

Copy the generated HTML from `gallery-sections.html` and paste it into your `life.md` file, or replace the entire file with `life-template.md`.

## 📁 File Structure

```
your-site/
├── _includes/
│   └── gallery-scripts.html      # Gallery JavaScript & CSS
├── _utils/
│   └── gallery-import.js         # Image import utility
├── public/
│   └── img/
│       └── gallery/              # Your photos go here!
│           ├── 20241223_items_1.jpg
│           ├── 20241223_items_2.jpg
│           └── ...
├── life.md                       # Your gallery page
├── import-gallery.bat           # Windows import script
└── GALLERY_README.md           # This file
```

## 🎨 Gallery Structure

Each adventure gallery follows this structure:

```html
<section class="adventure-gallery">
  <h4>Adventure Title</h4>
  <div class="gallery-grid">
    <div class="gallery-sizer"></div>
    <div class="gallery-item">
      <img src="/public/img/gallery/photo.jpg" alt="Description" loading="lazy" />
      <div class="gallery-overlay">
        <p>Photo caption appears on hover</p>
      </div>
    </div>
    <!-- More gallery items... -->
  </div>
</section>
```

## 🛠️ Customization

### Styling
Edit the gallery styles in `public/css/lanyon.css`:
- `.adventure-gallery` - Main gallery container
- `.gallery-grid` - Grid layout
- `.gallery-item` - Individual photo containers
- `.gallery-overlay` - Caption overlays

### Image Processing
The import utility automatically:
- Generates human-readable names from filenames
- Extracts dates from filename patterns
- Groups photos by date/adventure
- Creates SEO-friendly alt text

### Naming Conventions

For best automatic processing, use these filename patterns:

```
YYYYMMDD_description.jpg          # Date + description
adventure_name_001.jpg            # Adventure series
location_activity_timestamp.jpg   # Descriptive naming
```

## 📱 Mobile Experience

The gallery is fully responsive with:
- **Single column** layout on phones
- **Two columns** on tablets
- **Multiple columns** on desktop
- **Touch-friendly** lightbox navigation
- **Optimized loading** for mobile data

## ⌨️ Keyboard Shortcuts

When viewing images in lightbox mode:
- `Escape` - Close lightbox
- `←` / `→` - Navigate between images
- `Click outside` - Close lightbox

## 🔧 Advanced Usage

### Custom Gallery Generation

```javascript
// Generate specific adventure gallery
const adventureImages = [
  { path: '/public/img/gallery/img1.jpg', name: 'Summit View', date: '2024-12-23' },
  { path: '/public/img/gallery/img2.jpg', name: 'Trail Marker', date: '2024-12-23' }
];

const html = galleryUtils.generateGalleryHTML(adventureImages, '🏔️ Epic Mountain Hike');
```

### Batch Processing

```bash
# Scan available images
node _utils/gallery-import.js scan

# Generate with custom title
node _utils/gallery-import.js --title "Summer Adventures 2024"

# Interactive mode with prompts
node _utils/gallery-import.js interactive
```

## 🎯 Performance Tips

1. **Optimize images** before uploading (recommended max width: 1200px)
2. **Use JPEG** for photos, PNG for graphics
3. **Enable lazy loading** (automatically included)
4. **Consider WebP format** for better compression

## 🐛 Troubleshooting

### Images not loading?
- Check file paths are correct (`/public/img/gallery/`)
- Ensure images have proper extensions (jpg, jpeg, png, gif, webp)
- Verify Jekyll is serving static files correctly

### Gallery layout broken?
- Ensure `gallery-sizer` div is present
- Check that masonry.js and imagesloaded.js are loading
- Verify CSS grid styles are applied

### Import utility not working?
- Make sure Node.js is installed
- Check that `_utils/gallery-import.js` exists
- Verify gallery directory exists and contains images

## 🔄 Workflow

1. **Take photos** during your adventures
2. **Rename files** with descriptive names (optional)
3. **Drop files** into `public/img/gallery/`
4. **Run import script** `./import-gallery.bat`
5. **Copy generated HTML** to your page
6. **Commit and push** to deploy

## 📞 Support

For issues or feature requests, check:
- File paths and permissions
- Browser console for JavaScript errors
- Jekyll build logs for processing errors

---

**Enjoy sharing your adventures! 🌟** 