const http = require("http");    //importing hhtp module
const fs = require("fs");       //importing fs module for file handling
const path = require("path");   //importing path module for work with file and directories

const server = http.createServer((req, res) => {
    console.log(`Request received for: ${req.url}`);
    
    // Define the file to serve based on the URL
    let filePath = path.join(__dirname, "folder", req.url === "/" ? "index.html" : req.url);
    const ext = path.extname(filePath);

    // Check if no extension is provided, append ".html"
    if (!ext) {
        filePath += ".html";
    }

    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {  // File not found
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
            } else {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Server Error");
            }
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

