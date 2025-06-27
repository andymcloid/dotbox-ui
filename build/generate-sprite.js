/**
 * SVG Sprite Generator
 * Combines all individual SVG files into a single sprite sheet
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ICONS_DIR = path.resolve(__dirname, '../src/components/Icon/icons');
const OUTPUT_DIR = path.resolve(__dirname, '../dist');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'icons.svg');
const ICON_INDEX_FILE = path.join(OUTPUT_DIR, 'icons.json');

/**
 * Read all SVG files from the icons directory
 */
function readSVGFiles() {
    const files = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));
    const icons = {};
    
    files.forEach(file => {
        const iconName = path.basename(file, '.svg');
        const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf8');
        
        // Extract the inner content of the SVG (everything inside the <svg> tags)
        const match = content.match(/<svg[^>]*>(.*?)<\/svg>/s);
        if (match) {
            icons[iconName] = match[1].trim();
        }
    });
    
    return icons;
}

/**
 * Generate SVG sprite from individual icons
 */
function generateSprite(icons) {
    let sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none;">
`;
    
    // Add each icon as a symbol
    Object.entries(icons).forEach(([name, content]) => {
        sprite += `  <symbol id="icon-${name}" viewBox="0 0 24 24">
    ${content}
  </symbol>
`;
    });
    
    sprite += '</svg>';
    
    return sprite;
}

/**
 * Generate icon index JSON file
 */
function generateIndex(icons) {
    const index = {
        version: '1.0.0',
        icons: Object.keys(icons),
        generated: new Date().toISOString()
    };
    
    return JSON.stringify(index, null, 2);
}

/**
 * Main build function
 */
function build() {
    console.log('🎨 Building SVG sprite...');
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Read all SVG files
    const icons = readSVGFiles();
    console.log(`📁 Found ${Object.keys(icons).length} icons`);
    
    // Generate sprite
    const sprite = generateSprite(icons);
    fs.writeFileSync(OUTPUT_FILE, sprite);
    console.log(`✅ Generated sprite: ${OUTPUT_FILE}`);
    
    // Generate index
    const index = generateIndex(icons);
    fs.writeFileSync(ICON_INDEX_FILE, index);
    console.log(`📋 Generated index: ${ICON_INDEX_FILE}`);
    
    // Log all icon names
    console.log('\n📌 Available icons:');
    Object.keys(icons).forEach(name => {
        console.log(`   - ${name}`);
    });
    
    console.log('\n✨ SVG sprite build complete!');
}

// Run the build
build();