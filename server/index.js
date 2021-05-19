// access common JS modules
const express = require('express');
// ES 2015 syntax
// import express from 'express'

// Create an express app to handle incoming requests
const app = express();

// an arrow function (similar to lambda function in Python)
// get(): register for http GET requrest (other: post(), put(), delete(), patch())
// the second argument of get() is the route handler
// '/': accessed route
// req: JS object representing the incoming request
// res: JS object representing the outgoing response
app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

// Prod: Run the app on a certain port configured by Heroku (a runtime environment variable)
// Dev: Run on PORT 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT)
// app.listen(5000); // run on port 5000


