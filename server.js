const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'products',
  authPlugins: {
    caching_sha2_password: true,
    mysql_native_password: true
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});


        // Set up the EJS view engine



const hostname = 'localhost';
const port = 3000;




const server = http.createServer((req, res) => {
    console.log("Request for " + req.url + " by method " + req.method);
    if (req.method == 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const pathName = parsedUrl.pathname;
        const query = parsedUrl.query;
        var fileUrl;
        //app.set('view engine', 'ejs');

        // Define a route for the product search

        
 
        if (pathName == '/') {
            if ('search' in query) {
                
                // Handle search query
                const searchTerm = query['search'];
                //console.log(searchTerm)
                connection.query(`SELECT * FROM products.products WHERE ProductName = '${searchTerm}' `, (error, results, fields) => {
                    if (error) {
                      console.error('Error executing SQL query: ' + error.stack);
                      return;
                    }
                    //console.log('Results: ', results);
                  });
                  
            }
            fileUrl = '/index.html';
        }
        else fileUrl = req.url;
        //
        //if (req.url == '/') ';
        //;
        
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        const validExtensions = ['.jpeg', '.jpg', '.png', '.gif']
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + 
                                ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else if (fileExt == '.css') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + 
                                ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/css');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else if (fileExt == '.js') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + 
                                ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/javascript');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else if(fileExt == '.jpg' || fileExt == '.jpeg' || fileExt == '.png' || fileExt == '.gif') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + 
                                ' not found</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                
                if (fileExt == '.jpg' || fileExt == '.jpeg') {
                    res.setHeader('Content-Type', 'image/jpeg');
                  } else if (fileExt == '.png') {
                    res.setHeader('Content-Type', 'image/png');
                  } else if (fileExt == '.gif') {
                    res.setHeader('Content-Type', 'image/gif');
                  }
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                    ' not a HTML, CSS or JavaScript file</h1></body></html>');
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
