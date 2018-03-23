const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    postID: String, 
    karma: Number, 
    id: String, 
    userID: String, 
    inReplyTo: {type: String, default: ""}, 
    body: String, 
    date: {type: Date, default: Date.now}
}, {collection: 'default'})
