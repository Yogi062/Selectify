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

// Define a route for the product search
app.get('/', (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;
  if ('search' in query) {
    console.log(req.url);
    // Handle search query
    const searchTerm = query['search'];
    console.log(searchTerm)
    connection.query(`SELECT * FROM products
    WHERE brand REGEXP '${searchTerm}' OR
          product_name REGEXP '${searchTerm}';`, (error, results, fields) => {
      if (error) {
        console.error('Error executing SQL query: ' + error.stack);
        
        return;
      }
      console.log('Results: ', results);
      res.render('rough.ejs', { products: results });
    });
  }
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up the EJS view engine
app.set('view engine', 'ejs');

const hostname = 'localhost';
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
