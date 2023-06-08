const fs = require('fs');
const path = require('path');
const url = require('url');
const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());


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



app.get('/login', async(req, res) => {
  //console.log("We are here")
  const { username, password, first_name, last_name} = req.query;
  //console.log(req.body)
  //console.log(req.query)

  if ('search' in req.query){
    const searchTerm = req.query['search'];

    

    connection.query(`SELECT * FROM products.products
    WHERE product_name REGEXP '${searchTerm}' ORDER BY product_name;`, (error, results, fields) => {
      if (error) {
        console.error('Error executing SQL query: ' + error.stack);
        res.status(500).send('Error executing SQL query');
        return;
      }


      //console.log('Results: ', results);
      res.render('result_after_login.ejs', { products: results,  'firstName': first_name});
    });
  }

  const sql = `SELECT * FROM users WHERE email = '${username}' AND password = '${password}'`;

  connection.query(sql, (error, results, fields) => {
  if (error) {
    console.error(error);
    res.status(500).send('Internal server error');
    return;
  }
  const firstRow = results[0];
  const firstName = firstRow.first_name;
  console.log(firstName)
  if (results.length > 0) {
    res.render('index_after_login.ejs', { 'firstName': firstName });
    //res.sendFile(path.join(__dirname, '/views/index_after_login.ejs'));

    // username and password are correct
    // do something, e.g., set a session variable and redirect to a protected page
  } else {
    // username and password are incorrect
    // show an error message and stay on the login page
  }
});
});





// Define a route for signing up a new user
app.get('/signup', async(req, res) => {
  console.log("We are here")
  const { email, password , first_name, last_name } = req.query;
  //console.log(req.body)
  console.log(req.query)
  if ('search' in req.query){
    const searchTerm = req.query['search'];
    connection.query(`SELECT * FROM products.products
    WHERE product_name REGEXP '${searchTerm}' ORDER BY product_name;`, (error, results, fields) => {
      if (error) {
        console.error('Error executing SQL query: ' + error.stack);
        res.status(500).send('Error executing SQL query');
        return;
      }


      //console.log('Results: ', results);
      res.render('result_after_login.ejs', { products: results});
    });
  }
  try {
    // Check if the email address is already in use
    const result = await connection.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [email]);
    console.log(result); // Check the result value in the console
    const rows = result[0];
    const fields = result[1];
    const count = 0
    if (rows && rows.length > 0) {
      const count = rows[0].count;
      // Do something with the count variable
    }
    if (count > 0) {
      res.status(409).send('Email address already in use');
      return;
    }

    // Insert the new user into the database
    console.log([email,password])
    console.log("We are going good")
    await connection.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ? ,? ,?)', [email, password, first_name, last_name]);

    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
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
    connection.query(`SELECT * FROM products.products
    WHERE product_name REGEXP '${searchTerm}' ORDER BY product_name;`, (error, results, fields) => {
      if (error) {
        console.error('Error executing SQL query: ' + error.stack);
        res.status(500).send('Error executing SQL query');
        return;
      }


      console.log('Results: ', results);
      res.render('result.ejs', { products: results});
    });
  } else {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
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
