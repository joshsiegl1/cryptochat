var express = require("express"), 
    router = express.Router(); 

    const MongoClient = require("mongodb").MongoClient
    const mongoose = require("mongoose")

    const groupSchema = require("./models/group_model"); 
    const messageSchema = require("./models/message_model"); 
    const userSchema = require("./models/user_model"); 

    const url = require("./Config.js").MongoDBConnectionString; 

    const AuthMiddleware = require("./AuthMiddleware.js"); 
    const jwt = require("jsonwebtoken"); 
    const jwtSecret = require("./Config.js").jwtSecret; 

    const crypto = require("crypto"); 

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
                        }, function (err, docs) { 
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

router.post('/create', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema)
    const Group = mongoose.model('Group', groupSchema); 

    let messageNumber = req.body.messageNumber; 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        if (!err) { 
            User.findOne({phone: phoneNum}, function (err, user) { 
                if (!err && user !== null && user !== undefined) { 
                    User.findOne({phone: messageNumber}, function (err, otherUser) { 
                        if (!err && otherUser !== null && otherUser !== undefined) { 
                            let id = phoneNum + messageNumber; 
                            let _id = crypto.createHash('md5').update(id).digest('hex'); 
                            Group.findOne({id: _id}, function (err, group) { 
                                if (!err) { 
                                    if (group) { 
                                        res.send(200, group); 
                                    }
                                    else { 
                                        const g = { 
                                            id: _id, 
                                            name: '', 
                                            slug: '', 
                                            type: 'private', 
                                            participants: [
                                                {
                                                    id: phoneNum
                                                }, 
                                                { 
                                                    id: messageNumber
                                                }
                                            ]
                                        }
                                        let newGroup = new Group(g); 
                                        newGroup.save(function(err, results) { 
                                            if (err) res.send({error: err}); 
                                        })
                                        let groups = user.groups; 
                                        groups.push({
                                            id: _id
                                        })
                                        let userUpdate = { 
                                            groups
                                        }
                                        User.findOneAndUpdate({phone: phoneNum}, userUpdate, function (err, result) { 
                                            if (err) res.send({error: err}); 
                                        })

                                        let otherGroups = otherUser.groups; 
                                        otherGroups.push({
                                            id: _id
                                        })
                                        let otherUserUpdate = { 
                                            groups: otherGroups
                                        }

                                        User.findOneAndUpdate({phone: messageNumber}, otherUserUpdate, function (err, result) { 
                                            if (err) res.send({err: err}); 
                                        })

                                        res.send(200, {result: "success"}); 
                                    }
                                }
                            })

                        }
                    })
                }
            })
        }
    })
})

module.exports = router; 