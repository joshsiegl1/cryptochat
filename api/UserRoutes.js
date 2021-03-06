var express = require('express'), 
    router = express.Router(); 

    const MongoClient = require("mongodb").MongoClient
    const mongoose = require("mongoose")

    const bcrypt = require("bcrypt"); 
    const uuid = require('uuid/v4'); 

    const url = require("./Config.js").MongoDBConnectionString; 
    var userSchema = require("./models/user_model.js"); 
    var chatSchema = require("./models/chat_model.js"); 
    var authSchema = require("./models/authToken_model.js"); 

    const AuthMiddleware = require('./AuthMiddleware.js'); 
    const jwt = require("jsonwebtoken"); 
    const jwtSecret = require("./Config.js").jwtSecret; 

router.delete('/delete', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema)

    const token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        if (err) { 
            res.send(301, {response: "Access Denied"}); 
        }
        let phoneNum = decoded.phone; 
        User.remove({phone: phoneNum}, function(err) { 
            if (err) res.send(500, {error: err}); 
        })
    })

    res.send(200, {response: 'ok'}); 
})

router.post('/updateprofilepic', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema)

    let phoneNum = req.body.phone
    let profileUrl = req.body.url

    let update = { 
        profilepic: profileUrl
    }

    User.findOneAndUpdate({'phone': phoneNum}, update, {upsert: true}, function (err, doc) { 
        if (err) return res.send(500, {error: err}); 
    })

    res.send(200, {ok: "profile pic updated"})
})

router.delete('/deletepost', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema); 
    const Chat = mongoose.model('Chat', chatSchema); 

    let postID = req.body.postID; 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        User.findOne({phone: phoneNum}, function (err, doc) { 
            if (!err) { 
                if (doc !== null && doc !== undefined) { 
                    Chat.findOne({postID: postID}, function (error, chat) { 
                        if (!error) { 
                            if (chat !== null && doc !== undefined) { 
                                if (Array.isArray(chat.userID)) { 
                                    if (chat.userID.indexOf(phoneNum) !== -1) { 
                                        Chat.findOneAndRemove({postID: postID}, function (err, c) { 
                                            if (!err) { 
                                                res.send(200, {Success: "delete successful"}); 
                                            }
                                            else res.send(200, {Erorr: "something went wrong"})
                                        })
                                    }
                                    else res.send(200, {Error: "You can't delete something that's not yours"})
                                }
                            }
                            else res.send(200, {Erorr: "No chat found"})
                        }
                        else res.send(200, {Error: "No chat found"})
                    })

                }
                else res.send(200, {Error: "User not found"})
            }
            else res.send(200, {Error: "User not found"})
        })
    })
})

router.post('/blockpost', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema); 

    let postID = req.body.postID; 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        User.findOne({phone: phoneNum}, function (err, doc) { 
            if (!err) { 
                if (doc !== null && doc !== undefined) { 
                    let blockedPosts = doc.blockedPosts; 
                    if (blockedPosts !== null && blockedPosts !== undefined) { 
                        blockedPosts.push(postID); 
                    }
                    else { 
                        blockedPosts = []; 
                        blockedPosts.push(postID); 
                    }
                    doc.set("blockedPosts", blockedPosts); 
                    doc.save((err, saved) => { 
                        if (err) res.send(500, err) 
                        else res.send(200, saved); 
                    })
                }
                else res.send(404, "user not found"); 
            }
            else res.send(500, err); 
        })
    })
})

router.post('/flagpost', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const Chat = mongoose.model('Chat', chatSchema)
    
    let postID = req.body.postID; 

    Chat.findOne({postID: postID}, function (err, doc) { 
        if (!err) { 
            if (doc !== null && doc !== undefined) { 
                let count = doc.flaggedCount; 
                if (count === null || count === undefined) count = 0; 
                count++; 
                doc.set("flaggedCount", count); 
                doc.save((err, saved) => { 
                    if (err) res.send(500, err); 
                    else res.send(200, saved); 
                })
                
            }
            else res.send(404, "post not found"); 
        }
        else res.send(500, err); 
    })
})

router.post('/unblockuser', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema)

    let userUnBlockId = req.body.id; 
    let userUnBlockUsername = req.body.username; 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        if (!err) { 
            User.findOne({phone: phoneNum}, function (err, doc) { 
                if (!err) { 
                    if (userUnBlockId !== undefined && userUnBlockId !== "" && userUnBlockId !== null) { 
                        let existingUsers = doc.blockedUsers; 
                        if (existingUsers !== null && existingUsers !== undefined) { 
                            let newArray = []; 
                            for (let i = 0; i < existingUsers.length; i++) { 
                                if (existingUsers[i]._id !== userUnBlockId) { 
                                    newArray.push(existingUsers[i]); 
                                }
                            }

                            User.findOne({phone: userUnBlockId}, function (err, u) { 
                                if (u) { 
                                    let blockedBy = u.blockedBy; 
                                    if (blockedBy !== null && blockedBy !== undefined) { 
                                        let newBlockedBy = []; 
                                        for (let i = 0; i < blockedBy.length; i++) { 
                                            if (blockedBy[i]._id !== phoneNum) { 
                                                newBlockedBy.push(blockedBy[i]); 
                                            }
                                        }
                                        u.set("blockedBy", newBlockedBy); 
                                        u.save((err, saved) => { 

                                        })
                                    }
                                }
                            })

                            doc.set("blockedUsers", newArray); 
                            doc.save((err, saved) => { 
                                if (err) res.send(200, {error: err}); 
                                else res.send(200, saved); 
                            })
                        }
                    }
                }
            })
        }
    })
})

router.post('/blockuser', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema)

    let userBlockId = req.body.id; 
    let userBlockUsername = req.body.username; 

    let token = req.get('cryptochat-token-x'); 
    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        User.findOne({phone: phoneNum}, function (err, doc) { 
            if (!err) { 
                if (userBlockId !== undefined && userBlockId !== "" && userBlockId !== null) { 
                    let existingUsers = doc.blockedUsers; 
                    if (existingUsers !== null && existingUsers !== undefined) { 
                        existingUsers.push(userBlockId); 
                        doc.set({blockedUsers: existingUsers}); 
                    }
                    else { 
                        let users = []; 
                        users.push(userBlockId); 
                        doc.set({blockedUsers: users}); 
                    }

                    User.findOne({phone: userBlockId}, function (err, b) { 
                        if (!err) { 
                            if (b !== null && b !== undefined) { 
                                let blockedBy = b.blockedBy; 
                                if (blockedBy !== null && blockedBy !== undefined) { 
                                    blockedBy.push(phoneNum); 
                                    b.set({blockedBy: blockedBy}); 
                                }
                                b.save((err, saved) => { 
                                    
                                })
                            }
                        }
                    })

                    doc.save((err, saved) => { 
                        if (err) res.send(500, err.message); 
                        else res.send(200, saved); 
                    })
                }

                if (userBlockUsername !== undefined && userBlockUsername !== "" && userBlockUsername !== null) { 
                    User.findOne({username: userBlockUsername}, function (err, u) { 
                        if (!err) { 
                            if (u) { 
                                let existingUsers = doc.blockedUsers
                                if (existingUsers !== null && existingUsers !== undefined) { 
                                    existingUsers.push(u.phone); 
                                    doc.set({blockedUsers: existingUsers}); 
                                }
                                else { 
                                    let users = []; 
                                    users.push(u.phone); 
                                    doc.set({blockedUsers: users}); 
                                }

                                let blockedBy = u.blockedBy; 
                                if (blockedBy !== null && blockedBy !== undefined) { 
                                    blockedBy.push(phoneNum); 
                                    u.set({blockedBy: blockedBy}); 
                                }

                                u.save((err, saved) => { 

                                })

                                doc.save((err, saved) => { 
                                    if (err) res.send(500, err.message); 
                                    else res.send(200, saved); 
                                })
                            }
                            else res.send(200, {error: "user not found"})
                        }
                    })
                }
            }
            else if (!doc) return res.send(404, {error: "no user found with phone number " + phoneNum})
        })
    })
})

router.post('/updateusername', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const User = mongoose.model('User', userSchema)

    let phoneNum = req.body.phone
    let username = req.body.username

    let update = { 
        username: username
    }

    User.findOneAndUpdate({'phone':phoneNum}, update, {upsert: true}, function (err, doc) {
        if (err) return res.send(500, {error: err}); 
    })

    res.send(200, {ok: "username updated"})
})

router.get('/', AuthMiddleware, (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema)
    
    let token = req.get('cryptochat-token-x'); 

    jwt.verify(token, jwtSecret, function (err, decoded) { 
        let phoneNum = decoded.phone; 
        User.findOne({phone: phoneNum}, function (err, doc) { 
            if (!err) { 
                return res.send(200, {user: doc}); 
            }
            else if (!doc) return res.send(404, {error: "no user found with phone number " + phoneNum})
        })
    })


})

router.post('/push-token', (req, res) => { 
    let phone = req.body.phone; 
    let token = req.body.token; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema); 

    let conditions = {phone: phone}, 
        update = {pushNotification: token}, 
        options = {multi: true}; 

    try { 
        User.update(conditions, update, options, function (err, numAffected) { 
            if (err) res.send(err); 
            console.log(numAffected); 

            res.send({"response" : "success"}); 
        })
    }
    catch(e) { 
        console.log(e); 
        res.send({"response" : "something went wrong"})
    }
})

router.post('/vote', (req, res) => { 
    let userID = req.body.userID; 
    let postID = req.body.postID; 
    let karma = req.body.karma; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    const user = mongoose.model('User', userSchema); 
    const chat = mongoose.model('Chat', chatSchema); 

    let conditions = {userID: userID}, 
        postConditions = {postID: postID}, 
        options = {mulit: true}

        try { 
            if (userID !== "anonymous") { 
                    user.update(conditions, {$inc: { karma: karma}}, options, function (err, numAffected) { 
                    if (numAffected.n > 0) { 
                        chat.update(postConditions, {$inc: { karma: karma}}, options, function (err, numaffected) { 
                            if (numaffected.n > 0) { 
                                res.send({"response" : "success"})
                            }
                            else { 
                                res.send({"response": "failure"})
                            }
                        })
                    }
                    else { 
                        res.send({"response" : "failure"})
                    }
                })
            }
            else { 
                chat.update(postConditions, {$inc: { karma: karma}}, options, function (err, numaffected) { 
                    if (numaffected.n > 0) { 
                        res.send({"response" : "success"})
                    }
                    else { 
                        res.send({"response": err})
                    }
                })
            }
      }
      catch (e) { 
        console.log(e); 
        res.send({"error" : e}); 
        }
})

module.exports = router; 