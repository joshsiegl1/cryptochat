const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    postID: String, 
    karma: Number, 
    id: String, 
    userID: [{type: Schema.Types.String, ref: 'User'}],  
    replies: [{type: Schema.Types.ObjectId, ref: 'Chat'}], 
    inReplyTo: {type: String, default: ""}, 
    body: String, 
    flaggedCount: Number, 
    date: {type: Date, default: Date.now}
}, {collection: 'default'})
