const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    id: String, 
    fbid: String, 
    email: String, 
    userID: String, 
    password: String, 
    pushNotification: String, 
    karma: Number, 
    phone: String, 
    dateCreated: {type: Date, default: Date.now}, 

}, {collection: 'users'})