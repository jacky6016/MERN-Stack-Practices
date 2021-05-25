// Mongoose models corresponding to MongoDB collections
const mongoose = require('mongoose');
// Destructuring: short hand assignment for `const Schema = mongoose.Schema` in ES 2015
const {Schema} = mongoose;
// When using mongoose, the schema has to be defined in advance (less flexible)
const userSchema = new Schema({
    googleId: String
});
// Create the model called 'users' with the defined schema
mongoose.model('users', userSchema)