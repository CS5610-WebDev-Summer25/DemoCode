const http = require('http');
console.log("Imported http");

const server = http.createServer(function(request, response) {
    console.log("Request received");
    console.log("Here's the request method:")
    console.log(request.method);
    console.log("Requst URL:", request.url);

    response.writeHead(200, {"Content-type": "text/html"});
    response.write("Hello HTTP from server!");
    response.end();
    console.log("Response sent!");
});

server.listen(9090);
console.log("Server listening on port 9090");
