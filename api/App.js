//import { replace } from '../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/tar';

const express = require('express')
const bodyParser = require("body-parser"); 
const bcrypt = require("bcrypt"); 
const app = express()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")
const uuid = require("uuid/v4"); 
const https = require("https"); 
const request = require("request"); 

const userRoutes = require('./UserRoutes.js'); 
const contentRoutes = require('./ContentRoutes.js'); 
const twilioRoutes = require("./TwilioRoutes.js"); 
const cmcRoutes = require("./CmcDataPullRoutes.js"); 
const messagingRoutes = require("./MessagingRoutes.js"); 

const url = require("./Config.js").MongoDBConnectionString; 

var chatSchema = require("./models/chat_model.js"); 
var userSchema = require("./models/user_model.js"); 
var categorySchema = require("./models/category_model.js"); 
var trackingSchema = require("./models/tracking_model.js"); 

const AuthMiddleware = require("./AuthMiddleware.js"); 

var port = process.env.PORT || 3000

app.use(bodyParser.json());

const pushNotification = (expToken) => { 

    let body = {
        'to' : expToken, 
        'sound' : 'default', 
        'body' : 'Someone has replied to your post'
    }

    request({
        url: 'https://exp.host/--/api/v2/push/send', 
        method: 'POST', 
        headers: { 
            'accept' : 'application/json',           
            'accept-encoding' : 'gzip, deflate', 
            'content-type': 'application/json', 
        }, 
        json: true, 
        body: body
    }, function (error, response, body) { 
        console.log(response); 
    })
}

app.use('/user', userRoutes); 
app.use('/content', contentRoutes); 
app.use('/phone', twilioRoutes); 
app.use('/cmc', cmcRoutes); 
app.use('/message', messagingRoutes); 

app.post('/chat', AuthMiddleware, (req, res) => {

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const Chat = mongoose.model('Chat', chatSchema)

    let c = { 
        postID: uuid(), 
        karma: '0', 
        body: req.body.body, 
        userID: req.body.userID, //This should be the auth number
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

app.post('/reply', AuthMiddleware, (req, res) => { 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const Chat = mongoose.model('Chat', chatSchema)
    const User = mongoose.model('User', userSchema)

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

                if (result.userID !== undefined && result.userID !== "anonymous") { 
                    User.findOne({phone: result.userID})
                        .exec((err, theUser) => { 
                            try { 
                                pushNotification(theUser.pushNotification); 
                            }
                            catch(e) { }
                        })
                }

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
            path: 'replies', 
            populate: {
                path: 'replies', 
                populate: { 
                    path: 'replies', 
                    populate: { 
                        path: 'replies'
                    }
                }
            }
        })
        .exec(function(err, results) { 
            res.send({
                results: results, 
                time: new Date() 
            }); 
        })
})

app.get('/others', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    var Category = mongoose.model('Category', categorySchema); 

    Category.find({})
         .exec(function(err, items) { 
             if (err) { 
                 res.send(err); 
             }
             else { 
                 res.send({items})
             }
         })
})

app.get('/chat/:crypto', (req, res) => { 

    var crypto = req.params.crypto; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    var user = mongoose.model('User', userSchema); 
    var chats = mongoose.model('Chat', chatSchema); 
    var tracking = mongoose.model('Tracking', trackingSchema); 

    tracking.findOne({id: crypto}, function (err, tracked) { 
        if (!err) { 
            if (!tracked) { 
                tracked = new tracking(); 
                tracked.id = crypto; 
                tracked.count = 1; 
            }
            tracked.count = tracked.count + 1; 
            tracked.save(function(err) { 
                if (err) console.log(err); 
            }); 
        }
    })

    chats.find({id: crypto})
         .populate({
             path : "userID", 
             model: 'User'
         })
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

