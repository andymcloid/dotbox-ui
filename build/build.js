#!/usr/bin/env node

/**
 * Main Build Script for Dotbox UI
 * Coordinates the entire build process:
 * 1. Generate dynamic index files
 * 2. Build JavaScript bundle
 * 3. Build CSS bundle
 * 4. Copy theme files
 * 5. Clean up dist folder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { generateIndexFiles } = require('./generate-index.js');

const DIST_DIR = path.join(__dirname, '../dist');

/**
 * Ensures dist directory exists and is clean
 */
function setupDistDirectory() {
    console.log('🧹 Setting up dist directory...');
    
    // Create dist directory if it doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
    }
    
    // Clean existing files (but keep directory)
    const files = fs.readdirSync(DIST_DIR);
    files.forEach(file => {
        const filePath = path.join(DIST_DIR, file);
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
        }
    });
    
    console.log('✅ Dist directory ready');
}

/**
 * Runs esbuild for JavaScript bundling
 */
function buildJavaScript() {
    console.log('📦 Building JavaScript bundle...');
    try {
        execSync('npx esbuild src/index.js --bundle --outfile=dist/bundle.js --loader:.css=file', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        console.log('✅ JavaScript bundle created');
    } catch (error) {
        console.error('❌ JavaScript build failed:', error.message);
        throw error;
    }
}

/**
 * Runs esbuild for CSS bundling
 */
function buildCSS() {
    console.log('🎨 Building CSS bundle...');
    try {
        execSync('npx esbuild src/index.css --bundle --outfile=dist/index.css', {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..')
        });
        console.log('✅ CSS bundle created');
    } catch (error) {
        console.error('❌ CSS build failed:', error.message);
        throw error;
    }
}

/**
 * Copies theme CSS file to dist
 */
function copyThemes() {
    console.log('🎨 Copying theme files...');
    try {
        const themeSrc = path.join(__dirname, '../src/styles/theme.css');
        const themeDest = path.join(DIST_DIR, 'theme.css');
        
        if (fs.existsSync(themeSrc)) {
            fs.copyFileSync(themeSrc, themeDest);
            console.log('✅ Theme files copied');
        } else {
            console.warn('⚠️  Theme file not found, skipping...');
        }
    } catch (error) {
        console.error('❌ Theme copy failed:', error.message);
        throw error;
    }
}

/**
 * Validates the build output
 */
function validateBuild() {
    console.log('🔍 Validating build output...');
    
    const requiredFiles = ['bundle.js', 'index.css', 'theme.css'];
    const missingFiles = [];
    
    requiredFiles.forEach(file => {
        const filePath = path.join(DIST_DIR, file);
        if (!fs.existsSync(filePath)) {
            missingFiles.push(file);
        } else {
            const stats = fs.statSync(filePath);
            console.log(`   ✓ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
        }
    });
    
    if (missingFiles.length > 0) {
        console.error('❌ Missing files:', missingFiles);
        throw new Error('Build validation failed');
    }
    
    console.log('✅ Build validation passed');
}

/**
 * Main build function
 */
async function build() {
    const startTime = Date.now();
    
    console.log('🚀 Starting Dotbox UI build process...\n');
    
    try {
        // Step 1: Generate dynamic index files
        generateIndexFiles();
        console.log('');
        
        // Step 2: Setup clean dist directory
        setupDistDirectory();
        console.log('');
        
        // Step 3: Build JavaScript
        buildJavaScript();
        console.log('');
        
        // Step 4: Build CSS
        buildCSS();
        console.log('');
        
        // Step 5: Copy themes
        copyThemes();
        console.log('');
        
        // Step 6: Validate build
        validateBuild();
        console.log('');
        
        const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`🎉 Build completed successfully in ${buildTime}s!`);
        console.log('');
        console.log('📂 Output files:');
        console.log('   - dist/bundle.js   (JavaScript bundle)');
        console.log('   - dist/index.css   (CSS bundle)');
        console.log('   - dist/theme.css   (Theme variables)');
        console.log('');
        console.log('🔧 Usage:');
        console.log('   Include in HTML: <script src="dist/bundle.js"></script>');
        console.log('                   <link rel="stylesheet" href="dist/index.css">');
        console.log('                   <link rel="stylesheet" href="dist/theme.css">');
        
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    build();
}

module.exports = { build };