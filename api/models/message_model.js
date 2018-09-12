const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    postID: String, 
    id: String, 
    userID: [{type: Schema.Types.String, ref: 'User'}], 
    replies: [{type: Schema.Types.ObjectId, ref: 'Chat'}],
    inReplyTo: {type: String, default: ""}, 
    body: String, 
    date: {type: Date, default: Date.now}
}, {collection: 'messages'}); 