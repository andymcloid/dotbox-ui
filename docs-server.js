const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the docs directory
app.use(express.static(path.join(__dirname, 'docs')));

// Serve the component library
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`Documentation server running at http://localhost:${port}`);
}); 