const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    phone: String,
    code: Number, 
    expires: Date
}, {collection: 'phoneCode'})