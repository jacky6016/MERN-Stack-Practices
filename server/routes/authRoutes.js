const passport = require('passport');

// exports the collection of route handlers as a function 
module.exports = (app) => {
    // Route handlers to access OAuth
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email'] // ask google for us to access the user's profile and email
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));
};