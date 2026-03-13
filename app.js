const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

let storedName = "";

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // 1. Serve the initial form (GET /)
    if (method === 'GET' && url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    // 2. Take in the name using POST (/submit)
    } else if (method === 'POST' && url === '/submit') {
        let body = '';
        
        // Listen for data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Once all data is received
        req.on('end', () => {
            const formData = querystring.parse(body);
            storedName = formData.username; // Matches <input name="username">
            
            // Redirect to /greet
            res.writeHead(302, { 'Location': '/greet' });
            res.end();
        });

    // 3. Display the name using GET (/greet)
    } else if (method === 'GET' && url === '/greet') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Hello, ${storedName}!</h1>`);

    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});