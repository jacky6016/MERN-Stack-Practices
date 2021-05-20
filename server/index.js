// access common JS modules
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys') // OAuth keys

// Create an express app to handle incoming requests
const app = express();

// Register the instance of Google Passport strategy to passport JS
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    // callback function
    (accessToken, refreshToekn, profile, done) => {
      console.log('access token', accessToken); // access user's Google data, expires after a certain amount of tim
      console.log('refresh token', refreshToekn); // refresh access token if it expires
      console.log('profile', profile);
    }
  )
);

// Route handler to access OAuth
app.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email'] // ask google for us to access the user's profile and email
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

// Prod: Run the app on a certain port configured by Heroku (a runtime environment variable)
// Dev: Run on PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT)


