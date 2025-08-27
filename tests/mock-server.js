const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

/**
 * Simple mock server for CI testing
 * Provides basic HTML responses that mimic the structure of the real application
 */
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log(`Mock server request: ${req.method} ${pathname}`);

  // Handle different routes
  switch (pathname) {
    case '/':
    case '/sms-dashboard':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>SMS Dashboard - Mock</title>
        </head>
        <body>
          <div>Welcome, Test User</div>
          <nav>
            <a href="/infrastructure">Infrastructure Manager</a>
            <a href="/panels">Panel Operations</a>
            <a href="/readers">Reader Management</a>
            <a href="/system">System Manager</a>
          </nav>
          <main id="main-content">
            <h1>SMS Dashboard</h1>
            <p>Mock environment for testing</p>
          </main>
        </body>
        </html>
      `);
      break;

    case '/infrastructure':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Infrastructure Manager</title></head>
        <body>
          <div>Welcome, Test User</div>
          <h1>Infrastructure Manager</h1>
          <div id="infrastructure-content">
            <button id="add-device">Add Device</button>
            <table id="device-table">
              <tr><td>Mock Device 1</td><td>Online</td></tr>
              <tr><td>Mock Device 2</td><td>Offline</td></tr>
            </table>
          </div>
        </body>
        </html>
      `);
      break;

    case '/panels':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Panel Operations</title></head>
        <body>
          <div>Welcome, Test User</div>
          <h1>Panel Operations</h1>
          <div id="panel-content">
            <input type="text" id="panel-search" placeholder="Search panels...">
            <div id="panel-list">
              <div class="panel-item" data-status="active">Panel A</div>
              <div class="panel-item" data-status="inactive">Panel B</div>
            </div>
          </div>
        </body>
        </html>
      `);
      break;

    case '/readers':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>Reader Management</title></head>
        <body>
          <div>Welcome, Test User</div>
          <h1>Reader Management</h1>
          <div id="reader-content">
            <button id="add-reader">Add Reader</button>
            <div id="reader-list">
              <div class="reader-item">Reader 001</div>
              <div class="reader-item">Reader 002</div>
            </div>
          </div>
        </body>
        </html>
      `);
      break;

    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Mock server shutting down...');
  server.close();
});
