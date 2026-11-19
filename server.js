// Static preview server for Rancho Bello
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5600;
const ROOT = __dirname;

const MIME = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.webp':'image/webp', '.svg':'image/svg+xml',
  '.mp4':'video/mp4', '.webm':'video/webm', '.mov':'video/quicktime',
  '.ico':'image/x-icon',
};

http.createServer((req, res) => {
  let url = decodeURIComponent((req.url || '/').split('?')[0]);
  if (url === '/') url = '/index.html';
  const file = path.join(ROOT, url);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control':'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log(`Rancho Bello en http://localhost:${PORT}`));
