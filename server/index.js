// access common JS modules
const express = require('express');
// we don't return any data from services/passport.js (just executes the code)
require('./services/passport'); 


// Create an express app to handle incoming requests
const app = express();
require('./routes/authRoutes')(app);
// Equivalent statements:
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);

// Prod: Run the app on a certain port configured by Heroku (a runtime environment variable)
// Dev: Run on PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT)

