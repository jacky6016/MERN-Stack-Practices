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

    app.get('/api/logout', (req, res) => {
        // use the logout function in req
        req.logout();
        res.send(req.user); // this is no longer valid (defined)
    });  

    // passport uses the cookie to fetch the user
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};