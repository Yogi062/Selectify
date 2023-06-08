const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Configure passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    // In a real app, you would look up the user's information in a database
    if (username === 'testuser' && password === 'testpass') {
      return done(null, { username: 'testuser' });
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.username);
});
passport.deserializeUser(function(username, done) {
  done(null, { username: username });
});

// Configure express
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
      </div>
      <div>
        <input type="submit" value="Log in">
      </div>
    </form>
  `);
});
app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
