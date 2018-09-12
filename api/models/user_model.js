const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    _id: { type: String}, 
    id: String, 
    fbid: String, 
    help: Boolean,
    email: String, 
    userID: String, 
    password: String, 
    pushNotification: String, 
    karma: Number, 
    phone: String,
    username: String,  
    profilepic: String, 
    blockedUsers: [{
        _id: { type: String}, 
        id: String
    }], 
    blockedBy: [{
        _id: { type: String}, 
        id: String
    }], 
    blockedPosts: [{
        _id: { type: String}, 
        id: String
    }], 
    groups: [{
        _id: { type: String}, 
        id: String
    }], 
    dateCreated: {type: Date, default: Date.now}, 

}, {collection: 'users'})