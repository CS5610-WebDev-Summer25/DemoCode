const http = require('http');
const fs = require('fs');

const HTML_DIR = 'html_serve';
const PORT = process.env.PORT || process.argv[2] || 9090;

const server = http.createServer(onRequest);

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);


function onRequest(req, resp) {
    console.log(`Received request for ${req.url}`);
    let respType = 'html';

    if ('/' === req.url) {
        fs.readFile(`${HTML_DIR}/index.html`,
            function(err, data) {
                resp.writeHead(200, {"Content-type": `text/${respType}`});
                resp.write(data);
                resp.end();
            });
    } else {
        fs.readFile(`${HTML_DIR}${req.url}`,
            function(err, data) {
                if (err) {
                    fs.readFile(`${HTML_DIR}/404.html`,
                        function(err, data) {
                            resp.writeHead(404,
                            {'Content-type': `text/${respType}`});
                            resp.write(data);
                            resp.end();
                        });
                } else {
                    if (req.url.match(/.css$/)) {
                        respType = 'css';
                    } else if (req.url.match(/.js$/)) {
                        respType = 'javascript';
                    }
                    resp.writeHead(200,
                        { 'Content-type': `text/${respType}`});
                    resp.write(data);
                    resp.end();
                }
        });
    }
}
