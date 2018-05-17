const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    id: String, 
    count: Number
}, {collection: 'tracking'})