const http = require('http');
const fs = require('fs');

const HTML_DIR = 'html_serve';
const PORT = process.env.PORT || process.argv[2] || 9090;

// Create Mongodb client object
const MongoClient = require('mongodb').MongoClient;
// Specify the database URL
const dbURL = 'mongodb://localhost:27017'
// Specify the database name
const dbName = 'demo_db'

// Declare variables
let db, collection;

// Use the MongoClient module to create a db connection
MongoClient.connect(dbURL, function(err, client){
    if (err) {
        console.log('Failed to connect to db server:', err);
    } else {
        console.log('Connected successfully to db server');
        db = client.db(dbName);
        collection = db.collection('doohickeys');
    }
});

const server = http.createServer(onRequest);

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);


function onRequest(req, resp) {
    console.log(`Received request for ${req.url}`);
    let respType = 'html';

    if ('/api_rest/doohickeys' === req.url) {
        collection.find({}).toArray(function(err, docs) {
            if (err) {
                // Send an HTTP 500 status code response
                resp.writeHead(500);
                resp.end(err);
            } else {
                // Return the data
                resp.writeHead(200, {'Content-type': 'application/json'});
                resp.end(JSON.stringify(docs));
            }
        });
    } else


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
