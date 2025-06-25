const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the docs directory
app.use(express.static(path.join(__dirname, 'docs')));

// Serve the component library
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Serve styles from dist for docs/demo
app.use('/styles', express.static(path.join(__dirname, 'dist/styles')));

// Serve component CSS for docs/demo
app.use('/components', express.static(path.join(__dirname, 'dist/components')));

// === SECURE COMPONENT API ENDPOINTS ===

// Get component metadata (component.json)
app.get('/api/component/:componentName/metadata', (req, res) => {
    try {
        const componentName = req.params.componentName;
        const metadataPath = path.join(__dirname, 'src', 'components', componentName, 'component.json');
        
        if (!fs.existsSync(metadataPath)) {
            return res.status(404).json({ error: 'Component metadata not found' });
        }
        
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load component metadata' });
    }
});

// Get component CSS
app.get('/api/component/:componentName/css', (req, res) => {
    try {
        const componentName = req.params.componentName;
        const cssPath = path.join(__dirname, 'src', 'components', componentName, `${componentName}.css`);
        
        if (!fs.existsSync(cssPath)) {
            return res.status(404).json({ error: 'Component CSS not found' });
        }
        
        const css = fs.readFileSync(cssPath, 'utf8');
        res.type('text/css').send(css);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load component CSS' });
    }
});

// Get component JavaScript
app.get('/api/component/:componentName/js', (req, res) => {
    try {
        const componentName = req.params.componentName;
        const jsPath = path.join(__dirname, 'src', 'components', componentName, `${componentName}.js`);
        
        if (!fs.existsSync(jsPath)) {
            return res.status(404).json({ error: 'Component JS not found' });
        }
        
        const js = fs.readFileSync(jsPath, 'utf8');
        res.type('application/javascript').send(js);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load component JS' });
    }
});

// List component examples
app.get('/api/component/:componentName/examples', (req, res) => {
    try {
        const componentName = req.params.componentName;
        const examplesDir = path.join(__dirname, 'src', 'components', componentName, 'examples');
        
        if (!fs.existsSync(examplesDir)) {
            return res.json([]);
        }
        
        const files = fs.readdirSync(examplesDir)
            .filter(file => file.endsWith('.wc'))
            .map(file => file.replace('.wc', ''));
        
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list component examples' });
    }
});

// Get specific component example
app.get('/api/component/:componentName/example/:exampleName', (req, res) => {
    try {
        const { componentName, exampleName } = req.params;
        const examplePath = path.join(__dirname, 'src', 'components', componentName, 'examples', `${exampleName}.wc`);
        
        if (!fs.existsSync(examplePath)) {
            return res.status(404).json({ error: 'Example not found' });
        }
        
        const example = fs.readFileSync(examplePath, 'utf8');
        res.type('text/html').send(example);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load example' });
    }
});

// List all available components
app.get('/api/components', (req, res) => {
    try {
        const componentsDir = path.join(__dirname, 'src', 'components');
        const components = fs.readdirSync(componentsDir)
            .filter(dir => {
                const dirPath = path.join(componentsDir, dir);
                return fs.statSync(dirPath).isDirectory();
            });
        
        res.json(components);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list components' });
    }
});

// Handle SPA routing - serve index.html for all component routes
app.get('/component/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Fallback for any other routes - serve index.html to let the SPA handle routing
app.get('*', (req, res) => {
    // Check if it's an API route first
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // For all other routes, serve the SPA
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(port, () => {
    console.log(`Documentation server running at http://localhost:${port}`);
    console.log(`API endpoints available at http://localhost:${port}/api/`);
}); 