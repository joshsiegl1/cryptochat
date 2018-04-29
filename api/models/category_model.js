const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    id: String, 
    name: String, 
    rank: Number
}, {collection: 'categories'})