const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    id: String, 
    userID: String, 
    password: String, 
    karma: Number, 
    dateCreated: {type: Date, default: Date.now}, 

}, {collection: 'users'})