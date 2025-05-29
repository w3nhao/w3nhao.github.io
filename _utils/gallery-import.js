#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Gallery Import Utility
 * Automatically scans for images and generates gallery HTML
 */

class GalleryImporter {
    constructor() {
        this.imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        this.galleryDir = './public/img/gallery';
        this.outputFile = './gallery-output.html';
    }

    /**
     * Scan directory for images
     */
    scanImages(directory = this.galleryDir) {
        try {
            const files = fs.readdirSync(directory);
            return files
                .filter(file => {
                    const ext = path.extname(file).toLowerCase();
                    return this.imageExtensions.includes(ext);
                })
                .map(file => ({
                    filename: file,
                    path: `/public/img/gallery/${file}`,
                    name: this.generateImageName(file),
                    date: this.extractDateFromFilename(file)
                }))
                .sort((a, b) => b.date.localeCompare(a.date));
        } catch (error) {
            console.error('Error scanning directory:', error.message);
            return [];
        }
    }

    /**
     * Generate human-readable name from filename
     */
    generateImageName(filename) {
        return filename
            .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
            .replace(/[_-]/g, ' ')
            .replace(/^\d{8}_/, '') // Remove date prefix
            .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
    }

    /**
     * Extract date from filename (assumes YYYYMMDD format)
     */
    extractDateFromFilename(filename) {
        const dateMatch = filename.match(/^(\d{8})/);
        if (dateMatch) {
            const dateStr = dateMatch[1];
            return `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`;
        }
        return new Date().toISOString().slice(0, 10);
    }

    /**
     * Generate gallery HTML for a set of images
     */
    generateGalleryHTML(images, title = 'New Adventure', adventure_id = null) {
        if (!images.length) {
            return '<p>No images found in gallery directory.</p>';
        }

        // Group images by date for adventures
        const groupedImages = this.groupImagesByDate(images);
        let html = '';

        if (adventure_id) {
            // Single adventure
            const adventureImages = images;
            html += this.generateSingleAdventureHTML(adventureImages, title);
        } else {
            // Multiple adventures
            Object.keys(groupedImages).forEach(date => {
                const adventureTitle = this.generateAdventureTitle(date, groupedImages[date]);
                html += this.generateSingleAdventureHTML(groupedImages[date], adventureTitle);
                html += '\n\n';
            });
        }

        return html;
    }

    /**
     * Generate HTML for a single adventure
     */
    generateSingleAdventureHTML(images, title) {
        let html = `<section class="adventure-gallery">\n  <h4>${title}</h4>\n  <div class="gallery-grid">\n    <div class="gallery-sizer"></div>\n`;
        
        images.forEach(image => {
            html += `    <div class="gallery-item">\n`;
            html += `      <img src="${image.path}" alt="${image.name}" loading="lazy" />\n`;
            html += `      <div class="gallery-overlay">\n`;
            html += `        <p>${this.generateCaption(image)}</p>\n`;
            html += `      </div>\n`;
            html += `    </div>\n`;
        });
        
        html += `  </div>\n</section>`;
        return html;
    }

    /**
     * Generate caption for image
     */
    generateCaption(image) {
        return `${image.name} - ${image.date}`;
    }

    /**
     * Generate adventure title from date and images
     */
    generateAdventureTitle(date, images) {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return `${formattedDate} Adventure`;
    }

    /**
     * Group images by date
     */
    groupImagesByDate(images) {
        return images.reduce((groups, image) => {
            const date = image.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(image);
            return groups;
        }, {});
    }

    /**
     * Generate markdown template for Jekyll
     */
    generateMarkdownTemplate(html) {
        return `---
layout: page
title: Adventures
permalink: /life/
---

<div class="posts-intro">
  <p class="blog-desc">It's about the journey, not the destination.</p>
  <hr class="intro-divider"/>
</div>

${html}

<div class="gallery-stats">
  <span><i class="fas fa-images"></i> {{ site.data.gallery.total_images | default: "Many" }} Photos</span>
  <span><i class="fas fa-mountain"></i> {{ site.data.gallery.total_adventures | default: "Several" }} Adventures</span>
</div>
`;
    }

    /**
     * Save generated HTML to file
     */
    saveToFile(content, filename = this.outputFile) {
        try {
            fs.writeFileSync(filename, content, 'utf8');
            console.log(`✅ Gallery HTML saved to: ${filename}`);
        } catch (error) {
            console.error('❌ Error saving file:', error.message);
        }
    }

    /**
     * Main import function
     */
    import(options = {}) {
        console.log('🔍 Scanning for images...');
        const images = this.scanImages();
        
        if (!images.length) {
            console.log('❌ No images found in gallery directory');
            return;
        }

        console.log(`✅ Found ${images.length} images`);
        
        const html = this.generateGalleryHTML(images, options.title, options.adventure_id);
        const markdown = this.generateMarkdownTemplate(html);
        
        // Save both HTML and Markdown versions
        this.saveToFile(html, 'gallery-sections.html');
        this.saveToFile(markdown, 'life-template.md');
        
        console.log('\n📋 Instructions:');
        console.log('1. Copy content from gallery-sections.html into your life.md file');
        console.log('2. Or replace life.md with life-template.md');
        console.log('3. Customize captions and titles as needed');
        console.log('4. Commit and push to deploy');
        
        // Also output to console for quick copy-paste
        console.log('\n📝 Quick Copy (Gallery HTML):');
        console.log('─'.repeat(50));
        console.log(html);
        console.log('─'.repeat(50));
    }

    /**
     * Interactive CLI mode
     */
    interactive() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('🎨 Interactive Gallery Import');
        console.log('─'.repeat(30));
        
        rl.question('Gallery title (default: "New Adventure"): ', (title) => {
            rl.question('Specific adventure ID (leave empty for all): ', (adventure_id) => {
                rl.close();
                
                this.import({
                    title: title || 'New Adventure',
                    adventure_id: adventure_id || null
                });
            });
        });
    }
}

// CLI Usage
if (require.main === module) {
    const importer = new GalleryImporter();
    
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'scan':
            console.log('📸 Available images:');
            const images = importer.scanImages();
            images.forEach(img => console.log(`  - ${img.filename} (${img.date})`));
            break;
            
        case 'interactive':
        case '-i':
            importer.interactive();
            break;
            
        case 'help':
        case '-h':
            console.log(`
Gallery Import Utility

Usage:
  node gallery-import.js              # Auto-import all images
  node gallery-import.js scan         # List available images
  node gallery-import.js interactive  # Interactive mode
  node gallery-import.js help         # Show this help

Features:
  • Automatically scans for new images
  • Generates Instagram-style gallery HTML
  • Groups adventures by date
  • Creates captions from filenames
  • Outputs ready-to-use Jekyll markdown
            `);
            break;
            
        default:
            importer.import();
    }
}

module.exports = GalleryImporter; 