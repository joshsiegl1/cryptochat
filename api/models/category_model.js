const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

module.exports = new Schema({
    id: String, 
    name: String,  
    cmc_rank: Number, 
    slug: String, 
    cmc_id: Number, 
    source: String, 
    description: String, 
    type: String, 
    _category: String
}, {collection: 'categories'})