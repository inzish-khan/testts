const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  if (filePath.startsWith('/')) {
    filePath = filePath.slice(1);
  }
  
  if (!filePath.includes('.')) {
    filePath = filePath + '.html';
  }
  
  const fullPath = path.join(__dirname, filePath);
  
  fs.readFile(fullPath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    
    const contentType = fullPath.endsWith('.html') ? 'text/html' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
