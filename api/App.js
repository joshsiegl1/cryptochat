const express = require('express')
const bodyParser = require("body-parser"); 
const bcrypt = require("bcrypt"); 
const app = express()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

const userRoutes = require('./UserRoutes.js'); 

const url = require("./Config.js").MongoDBConnectionString; 

var chatSchema = require("./models/chat_model.js"); 
var userSchema = require("./models/user_model.js"); 

var port = process.env.PORT || 3000

app.use(function(req, res, next) { 
    console.log(req.body)
    next(); 
})

app.use(bodyParser.json());

app.use(function(req, res, next) { 
    console.log(req.accepts('application/json')); 
    console.log("Fresh " + req.fresh)
    console.log(req.route)
    console.log(req.method)
    console.log(req.hostname)
    console.log(req.ip)
    console.log(req.body)
    next(); 
})

app.use('/user', userRoutes); 

app.post('/chat', (req, res) => {

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const Chat = mongoose.model('Chat', chatSchema)

    var newChat = new Chat(req.body); 

    newChat.save((err) => { 
        if (err) console.log(err); 
    })

    res.send("Success");  
})

app.get('/chat/:crypto', (req, res) => { 

    var crypto = req.params.crypto; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    var chats = mongoose.model('Chat', chatSchema); 

    chats.find({id: crypto})
         .sort({date: 'asc'})
         .exec(function(err, chats) { 

        if (err) { 
            res.send(err); 
        }
        else { 
            res.send(chats); 
        }
    }); 
})

app.listen(port, () => console.log('Example app listening on port 3000!'))

