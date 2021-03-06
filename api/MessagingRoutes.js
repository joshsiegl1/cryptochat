var express = require("express"), 
    router = express.Router(); 

    const MongoClient = require("mongodb").MongoClient
    const mongoose = require("mongoose")

    const groupSchema = require("./models/group_model"); 
    const messageSchema = require("./models/message_model"); 
    const userSchema = require("./models/user_model"); 

    const url = require("./Config.js").MongoDBConnectionString; 
    const personalPhone = require("./Config.js").personalPhone; 

    const AuthMiddleware = require("./AuthMiddleware.js"); 
    const jwt = require("jsonwebtoken"); 
    const jwtSecret = require("./Config.js").jwtSecret; 

    const crypto = require("crypto"); 
    const uuid = require("uuid/v4"); 
    const request = require("request"); 

const pushNotification = async (userphone, message, phoneNumbers) => { 

    mongoose.connect(url, {useMongoClient: true})
    const User = mongoose.model('User', userSchema); 

    let user = ''; 
    await User.findOne({phone: userphone}, function (err, doc) { 
        if (!err && doc !== null) { 
            user = doc.username; 
        }
    })

    
    let users = []; 
    await User.find({
        phone: {
            $in: phoneNumbers
        }
    }, function (err, results) { 
        if (!err && results !== null) { 
            for (var i = 0; i < results.length; i++) { 
                if (results[i].pushNotification !== null && results[i].pushNotification !== ''
                && results[i].pushNotification !== undefined) { 
                    //send a push notifcation if the message group contains a phone number other than
                    //the current user's phone, unless that phone number is my personal phone for test purposes.
                    if (results[i].phone === personalPhone
                        || results[i].phone !== userphone)
                    { 
                        users.push({
                            'to' : results[i].pushNotification, 
                            'body' : user + '\n' + message, 
                            'badge' : 1, 
                            'sound' : null, 
                            'priority' : 'high'
                        }); 
                    }
                }
            }
        }
    })

    if (users.length > 0) { 
        request({
            url: 'https://exp.host/--/api/v2/push/send', 
            method: 'POST', 
            headers: { 
                'accept' : 'application/json',           
                'accept-encoding' : 'gzip, deflate', 
                'content-type': 'application/json', 
            }, 
            json: true, 
             body: users
        }, function (error, response, body) { 
            console.log(response); 
        })

    }
}

router.get('/message/:group', (req, res) => { 
    var group = req.params.group; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    var Message = mongoose.model('Message', messageSchema); 
    var user = mongoose.model('User', userSchema); 

    Message.find({id: group})
            .populate({
                path: 'userID', 
                model: 'User'
            })
            .sort({date: 'desc'})
            .exec(function(err, messages) { 
                if (err) { 
                    res.send(err); 
                }
                else { 
                    res.send({
                        messages, 
                        time: new Date()
                    })
                }
            })
})

router.post('/message', AuthMiddleware, async (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const Message = mongoose.model('Message', messageSchema)
    const Group = mongoose.model('Group', groupSchema); 

    let m = { 
        postID: uuid(), 
        body: req.body.body, 
        userID: req.body.userID, 
        inReplyTo: '', 
        id: req.body.id, 
        replies: []
    }

    var newMessage = new Message(m); 

    newMessage.save((err) => { 
        if (err) console.log(err); 
    })

    await Group.findOne({id: req.body.id}, async (err, result) => { 
        if (!err && result !== null && result !== undefined) { 
            let participants = result.participants; 
            let p = []; 
            for (let i = 0; i < participants.length; i++) { 
                p.push(participants[i].id)
            }
            await pushNotification(req.body.userID, req.body.body, p); 
        }
    })

    res.send("Success"); 
})

router.get('/usergroups', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema); 
    const Group = mongoose.model('Group', groupSchema); 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        if (!err) { 
            User.findOne({phone: phoneNum}, function (err, user) { 
                if (user && !err) { 
                    let groups = user.groups; 
                    if (groups.length > 0) { 
                        let idGroup = []; 
                        for (let i = 0; i < groups.length; i++) { 
                            idGroup.push(groups[i].id); 
                        }
                        Group.find({
                            id: { $in: idGroup}
                        })
                        .populate({
                            path: 'participants.id', 
                            model: 'User'
                        }).exec(function (err, docs) { 
                            if (!err) res.send(docs);
                            else res.send(err);  
                        })
                    }
                    else res.send(200, {message: "no groups for this user"})
                }
                else res.send(200, {Error: err})
            })
        }
    })
})

router.post('/creategroup', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema)
    const Group = mongoose.model('Group', groupSchema)

    let phoneNumbers = req.body.phoneNumbers; 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone
        if (!err) { 
            User.findOne({phone: phoneNum}, function (err, user) { 
                if (!err && user !== null && user !== undefined) { 
                    User.find({
                        'phone' : { $in: phoneNumbers}
                    }, function(err, otherUsers) { 
                        if (!err && otherUsers !== null && otherUsers !== undefined) { 
                            let id = phoneNum; 
                            for (let i = 0; i < phoneNumbers.length; i++) { 
                                id += phoneNumbers[i]; 
                            }
                            let _id = crypto.createHash('md5').update(id).digest('hex'); 
                            Group.findOne({id: _id}, function (err, group) { 
                                if (!err) { 
                                    if (group) { 
                                        res.send(200, 
                                            {
                                                result: "success", 
                                                userGroup: group
                                            }); 
                                    }
                                    else { 

                                        //create the group participants construct
                                        let participants = []; 
                                        participants.push({id: phoneNum}); 
                                        for (let i = 0; i < phoneNumbers.length; i++) { 
                                            participants.push({id: phoneNumbers[i]}); 
                                        }

                                        const g = { 
                                            id: _id, 
                                            name: '', 
                                            slug: '', 
                                            type: 'private', 
                                            participants: participants
                                        }

                                        let newGroup = new Group(g); 
                                        newGroup.save(function(err, results) { 
                                            if (err) res.send({Error: err}); 
                                        })

                                        let userGroups = user.groups; 
                                        userGroups.push({
                                            id: _id
                                        })

                                        User.findOneAndUpdate({phone: phoneNum}, { groups: userGroups }, function (err, result) { 
                                            if (err) res.send({Error: err}); 
                                        })

                                        for (let i = 0; i < otherUsers.length; i++) { 
                                            let otherGroups = otherUsers[i].groups; 
                                            otherGroups.push({
                                                id: _id
                                            })

                                            User.findOneAndUpdate({phone: phoneNumbers[i]}, { groups: otherGroups }, function (err, result) { 
                                                if (err) res.send({Error: err}); 
                                            })
                                        }

                                        res.send(200, 
                                            {
                                                result: "success", 
                                                userGroup: newGroup
                                            }); 
                            
                                    }
                                }
                            })
                        }
                    })
                }
                else { 
                    res.send({Error: "Something went wrong"}); 
                }
            })
        }
        else { 
            res.send({Error: "Couldn't verify jwt"}); 
        }
    })
})

module.exports = router; 