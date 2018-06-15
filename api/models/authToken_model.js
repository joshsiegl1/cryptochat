const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    phone: String, 
    code: String
}, {collection: 'authTokens'})