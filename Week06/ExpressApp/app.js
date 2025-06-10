var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send(`<html>
        <head>
            <title>My Express Basic App</title>
        </head>
        <body>
            <h1>My Simple App</h1>
            <p>Welcome to my simple app!</p>
        </body>
        </html>
        `);
    }
);

const data = require('./data/MOCK_DATA.json');

app.get('/data', (req, res) => {
    res.json(data);
});

app.get('/data/:id', (req, res, next) => {
    console.log(`Looking for ID ${req.params.id}`);
    let personId = Number(req.params.id);
    res.json(data[personId-1]);
    next();
}, (req, res, next) => {
    console.log("Delivered the data!");
    next();
}, (req, res) => {
    console.log("Called next again!");
});

app.get('/northeastern', (req, res) => {
    res.redirect('http://www.northeastern.edu');
});

app.get('/dl', (req, res) => {
    res.download('images/ride.jpg');
});

// Handle a POST request to the /newItem URL
// data is currently in memory
app.post('/newItem', (req, res) => {
    console.log("Here's the request body:");
    console.log(req.body);
    let newItem = req.body;
    newItem.id = data.length+1;
    data.push(newItem);
    res.send("POST request received");
});

// DELETE request
// This is a hacky demo only that will completely
// mess up the data over multiple uses, but it
// shows how the delete method works
app.delete('/data/:id', (req, res) => {
    let index = Number(req.params.id) - 1;
    data.splice(index, 1);
    res.send(`DELETE request received for ${req.params.id}`);
});


app.route('/chain')
    .get((req, res) => {
        res.send("A GET request with /chain URL was received");
    })
    .post((req, res) => {
        res.send("A POST request with /chain URL was received");
    })
    .put((req, res) => {
        res.send("A PUT request with /chain URL was received");
    })
    .delete((req, res) => {
        res.send("A DELETE request with /chain URL was received");
    });

app.get('/errorExample', (req, res) => {
    throw new Error;
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(
        `<span style="color:red"><strong>Red Alert!</strong></span>
        <br>
        ${err.stack}`
    )
})



module.exports = app;
