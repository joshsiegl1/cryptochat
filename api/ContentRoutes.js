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

    let links = req.body.links; 
    for (let i = 0; i < links.length; i++) { 
        var link = new Link({
            id: links[i].id, 
            name: links[i].name, 
            url: links[i].url
        })

        link.save((error) => { 
            if (error) { 
                console.log(error); 
            }
        })
    }

    res.send({"response" : "Success"}); 
})

router.get('/link', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    var Link = mongoose.model('Link', linkSchema)
})

module.exports = router; 