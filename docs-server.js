const express = require('express');
const path = require('path');
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

app.listen(port, () => {
    console.log(`Documentation server running at http://localhost:${port}`);
}); 