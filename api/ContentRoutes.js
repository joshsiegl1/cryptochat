var express = require('express'), 
    router = express.Router(); 

const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

const categorySchema = require("./models/category_model"); 

const url = require('./Config.js').MongoDBConnectionString; 

const AuthMiddleware = require('./AuthMiddleware.js'); 

router.post('/category', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true}); 
    const db = mongoose.connection; 

    const Category = mongoose.model("Category", categorySchema); 

    let id = req.id; 
    let type = req.type; 
    let source = req.source; 
    let _category = req._category; 
    let name = req.name; 
    let description = req.description; 
    let slug = req.slug; //make this the users phone number + category name + random number

    let newCategory = new Category({ 
        id, 
        type, 
        source, 
        _category, 
        name, 
        description, 
        slug
    })

    newCategory.save(function(err, results) { 

    }); 

})

module.exports = router; 