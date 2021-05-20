const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys') // OAuth keys

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