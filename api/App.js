//import { replace } from '../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/tar';

const express = require('express')
const bodyParser = require("body-parser"); 
const bcrypt = require("bcrypt"); 
const app = express()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const uuid = require("uuid/v4"); 

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

    let c = { 
        postID: uuid(), 
        karma: '0', 
        body: req.body.body, 
        userID: req.body.userID, 
        inReplyTo: '', 
        id: req.body.id, 
        replies: []
    }

    var newChat = new Chat(c); 

    newChat.save((err) => { 
        if (err) console.log(err); 
    })

    res.send("Success");  
})

app.post('/reply', (req, res) => { 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const Chat = mongoose.model('Chat', chatSchema)

    let c = {
        postID: uuid(), 
        karma: '0', 
        body: req.body.body, 
        userID: req.body.userID, 
        inReplyTo: req.body.inReplyTo, 
        id: req.body.id + ' reply', 
        replies: []
    }

    var newReply = new Chat(c); 

    newReply.save((err, reply) => { 
        if (err) console.log(err); 
        var id = reply._id.toString(); 

        Chat.findOne({postID: req.body.inReplyTo})
            .exec((err, result) => { 
                result.replies = [...result.replies, id.toString()]; 
                result.save(function (err) { 
                    if (err) console.log(err); 
                })
            })
    })

    res.send("Success"); 
})

app.get('/post/:postID', (req, res) => { 
    var postID = req.params.postID; 
    
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    var post = mongoose.model('Chat', chatSchema); 

    post.find({postID: postID})
        .exec(function(err, thePost) { 
            if (err) { 
                res.send(err); 
            }
            else { 
                var replies = mongoose.model('Chat', chatSchema); 
                replies.find({inReplyTo: postID})
                        .exec(function(err, theReplies) { 
                            if (err) { 
                                res.send(thePost); 
                            }
                            else { 
                                res.send({
                                    comment: thePost, 
                                    replies: theReplies, 
                                    time: new Date()
                                })
                            }
                        })
            }
        })
})

app.get('/replies/:postID', (req, res) => { 
    var postID = req.params.postID; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    var post = mongoose.model('Chat', chatSchema); 

    post.findOne({postID: postID})
        .populate({
            path: 'replies'
        })
        .exec(function(err, results) { 
            res.send(results); 
        })
})

app.get('/chat/:crypto', (req, res) => { 

    var crypto = req.params.crypto; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    var chats = mongoose.model('Chat', chatSchema); 

    chats.find({id: crypto})
         .sort({date: 'desc'})
         .exec(function(err, chats) { 

        if (err) { 
            res.send(err); 
        }
        else { 
            res.send(
                {
                    chats, 
                    time: new Date()
                }); 
        }
    }); 
})

app.listen(port, () => console.log('Example app listening on port 3000!'))

