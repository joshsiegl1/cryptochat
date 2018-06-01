const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    code: Number, 
    expires: Date
}, {collation: 'phoneCodes'})