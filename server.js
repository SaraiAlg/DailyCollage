const http = require('http');
const path = require('path');
const fs = require('fs');

const publicDirectoryPath = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    console.log('Request received for:', req.url);

    let filePath = path.join(publicDirectoryPath, req.url === '/' ? 'index.html' : req.url);

    
    const extname = path.extname(filePath);
    let contentType = 'text/html'; 
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') { 
                fs.readFile(path.join(publicDirectoryPath, '404.html'), (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else { 
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // If no error, send the content
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
