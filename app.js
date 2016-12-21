const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

let server = http.createServer(function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }
    switch (path.extname(pathname)) {
        case ".html":
            res.writeHead(200, { "Content-Type": "text/html" });
            break;
        case ".js":
            res.writeHead(200, { "Content-Type": "text/javascript", "CaChe-Control": "max-age=691200" });
            break;
        case ".css":
            res.writeHead(200, { "Content-Type": "text/css" });
            break;
        case ".gif":
            res.writeHead(200, { "Content-Type": "image/gif", "CaChe-Control": "max-age=691200" });
            break;
        case ".jpg":
            res.writeHead(200, { "Content-Type": "image/jpeg", "CaChe-Control": "max-age=691200" });
            break;
        case ".png":
            res.writeHead(200, { "Content-Type": "image/png", "CaChe-Control": "max-age=691200" });
            break;
        default:
            res.writeHead(200, { "Content-Type": "application/octet-stream" });
    }

    fs.readFile(pathname, function (err, data) {
        res.end(data);
    });


});

server.listen(80, () => {
    console.log('server at port 80');
});
