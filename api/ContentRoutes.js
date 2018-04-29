var express = require('express'), 
    router = express.Router(); 

const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

const url = require('./Config.js').MongoDBConnectionString; 
var linkSchema = require("./models/link_model.js"); 

router.post('/link', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    var Link = mongoose.model('Link', linkSchema)

    var link = new Link({
        id: req.id, 
        name: req.name, 
        url: req.url
    })

    link.save((error) => { 
        if (error) { 
            res.send(error); 
            console.log(error); 
        }
    })

    res.send({"response" : "Success"}); 
})