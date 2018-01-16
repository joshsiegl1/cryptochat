const express = require('express')
const app = express()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

const url = require("./Config.js").MongoDBConnectionString; 

var kittenSchema = require('./models/kitten_model.js'); 


var port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/mongoose/', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection


    const Kitten = mongoose.model('Kitten', kittenSchema)

    var myNewKitten = new Kitten({"name": "Jeff"})

    myNewKitten.save((err) => { 
        if (err) console.log(err); 
    }); 

    res.send(myNewKitten)
})

app.get('/test/:myvar', (req, res) => { 

    var ret = ""

    MongoClient.connect(url, function(err, db) {
        if (err) res.send(err)

        var dbo = db.db("heroku_f44z0d6v")

        dbo.collection("default").insert({"mytest": req.params.myvar}, (err, result) => { 
            if (err) ret += err
            else ret += result
        })
    });

    res.send(ret)
})

app.listen(port, () => console.log('Example app listening on port 3000!'))

