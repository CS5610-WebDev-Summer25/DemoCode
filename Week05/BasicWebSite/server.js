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

const client = new MongoClient(dbURL);

// This is updated code using async/await syntax
// which enables us to use the newer MongoDB driver
// Many JS dependencies are moving away from the callback
// paradigmn (will discuss in class)
async function connectClient() {
    await client.connect();
    console.log('Connected successfully to db server');
    db = client.db(dbName);
    collection = db.collection('doohickeys');
}

connectClient();

const server = http.createServer(onRequest);

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);


async function onRequest(req, resp) {
    console.log(`Received request for ${req.url}`);
    let respType = 'html';

    // Async/await syntax update. See above
    if ('/api_rest/doohickeys' === req.url) {
        const docs = await collection.find({}).toArray();
        resp.writeHead(200, {'Content-type': 'application/json'});
        resp.end(JSON.stringify(docs));
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
