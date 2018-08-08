const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    phone: String,
    help: Boolean, 
    code: Number, 
    expires: Date
}, {collection: 'phoneCode'})