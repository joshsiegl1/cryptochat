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

    let id = req.body.id; 
    let type = req.body.type; 
    let source = req.body.source; 
    let _category = req.body._category; 
    let name = req.body.name; 
    let description = req.body.description; 
    let slug = req.body.slug; 

    let newCategory = new Category({ 
        id: id, 
        type: type, 
        source: source, 
        _category: _category, 
        name: name, 
        description: description, 
        slug: slug, 
        cmc_rank: 0, 
        cmc_id: 0
    })

    newCategory.save(function(err, results) { 
        if (err) res.send({error: err}); 
        else res.send(results); 
    }); 

})

module.exports = router; 