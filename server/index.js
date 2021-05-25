// access common JS modules
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User'); // The model definition should be executed before usage (in services/passport)
// we don't return any data from services/passport.js (just executes the code)
require('./services/passport'); 

// mongoose connection
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Create an express app to handle incoming requests
const app = express();

// Use middlewares to pre-process requests (e.g user authentication) before handling them off to our route handlers
app.use(
  // Register the use of cookies for the app
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // expiration perid for cookies in milliseconds
    keys: [keys.cookieKey] // cookieSession will randomly pick one in the array and return to user
  })
);
// Use cookie session in passport JS
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// Equivalent statements:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app)


// Prod: Run the app on a certain port configured by Heroku (a runtime environment variable)
// Dev: Run on PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);

