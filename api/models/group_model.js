const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    id: String, 
    name: String, 
    slug: String, 
    type: String,
    participants: [{
        _id: {type: String}, 
        id: String
    }]
}, {collection: 'groups'})