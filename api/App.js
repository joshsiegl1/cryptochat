const express = require('express')
const app = express()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

import { MongoDBConnectionString } from "./Config.js"; 



var port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/mongoose/', (req, res) => { 
    mongoose.connect(MongoDBConnectionString)
    const db = mongoose.connection

    var myTestSchema = mongoose.Schema({
        name: String
    })

    myTestSchema.methods.speak = () => { 
        var greeting = this.name
         ? "My name is " + this.name
         : "I don't have a name"
    }

    const Kitten = mongoose.model('Kitten', myTestSchema)

    var myNewKitten = new Kitten({name: "Jeff"})
    myNewKitten.save((err, myNewKitten) => { 
        if (err) return console.error(err)
        myNewKitten.speak()
    })
})

app.get('/test/:myvar', (req, res) => { 

    var ret = ""

    MongoClient.connect(MongoDBConnectionString, function(err, db) {
        if (err) res.send(err)

        var dbo = db.db("heroku_f44z0d6v")

        dbo.collection("default").insert({mytest: req.param.myvar}, (err, result) => { 
            if (err) ret += err
            else ret += result
        })
    });

    res.send(ret)
})

app.listen(port, () => console.log('Example app listening on port 3000!'))

