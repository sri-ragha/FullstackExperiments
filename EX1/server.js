const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

// Function to get MIME type based on file extension
function getMimeType(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  return mimeTypes[extname] || 'application/octet-stream';
}

// Function to serve static files
function serveStaticFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>404 - Page Not Found</title>
            <link rel="stylesheet" href="/css/style.css">
          </head>
          <body>
            <div class="error-container">
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/" class="btn">Go Home</a>
            </div>
          </body>
          </html>
        `);
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>500 - Server Error</title>
            <link rel="stylesheet" href="/css/style.css">
          </head>
          <body>
            <div class="error-container">
              <h1>500</h1>
              <h2>Server Error</h2>
              <p>Something went wrong on our end.</p>
              <a href="/" class="btn">Go Home</a>
            </div>
          </body>
          </html>
        `);
      }
      return;
    }

    // Set appropriate headers
    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Security: Prevent directory traversal
  if (pathname.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('<h1>403 Forbidden</h1>');
    return;
  }

  // Construct file path
  const filePath = path.join(__dirname, 'public', pathname);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, serve 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Page Not Found</title>
          <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
          <div class="error-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/" class="btn">Go Home</a>
          </div>
        </body>
        </html>
      `);
    } else {
      // File exists, serve it
      serveStaticFile(filePath, res);
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving static files from ./public directory`);
  console.log(`🛑 Press Ctrl+C to stop the server`);
}); 