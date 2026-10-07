const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = '.' + filePath;

  try {
    const content = fs.readFileSync(filePath);
    const contentType = filePath.endsWith('.css') ? 'text/css' : 'text/html';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://127.0.0.1:3000');
});
