/* Use Passport JS to authenticate users */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); // OAuth keys
const mongoose = require('mongoose');
// Pull the defined model 'users'
const User = mongoose.model('users');

// Generate a cookie for an existent user
passport.serializeUser((user, done) => {
  // user_id is the unique mongoDB object ID
  done(null, user.id); // done(ERROR_OBJECT, RETURN_OBJECT)
});

// Return the user model with a cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Register the instance of Google Passport strategy to passport JS
// Use the strategy to retrieve user's Google profile
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' // callback route
      },
      // callback function
      (accessToken, refreshToekn, profile, done) => {
        // Make sure if we already have this user record
        // Note: DB actions are ASYNCHRONOUS, it returns a PROMISE
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile ID
            done(null, existingUser); // a callback function
          } else {
            // Create a new instance of the model (collection) and save it to DB
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        });
      }
    )
  );

  // TODO: use another OAuth (Facebook, Github, LinkedIn, etc)