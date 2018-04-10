var express = require('express'), 
    router = express.Router(); 

    const MongoClient = require("mongodb").MongoClient
    const mongoose = require("mongoose")

    const bcrypt = require("bcrypt"); 
    const uuid = require('uuid/v4'); 

    const url = require("./Config.js").MongoDBConnectionString; 
    var userSchema = require("./models/user_model.js"); 
    var chatSchema = require("./models/chat_model.js"); 

router.post('/', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema)

    let body = req.body; 

    User.find({userID: body.userID}, function (err, docs) {
        if (docs.length) { 
            res.send({"response" : "username already exists"})
        }
        else { 
            bcrypt.hash(body.password, 10, function(err, hash) { 
                var newUser = new User({
                    email: body.email, 
                    fbid: "", 
                    karma: body.karma, 
                    userID: body.userID, 
                    password: hash
                }); 
    
                newUser.save((error) => { 
                    if (error) {
                        res.send(error); 
                        console.log(error); 
                    }
                })
            })

            res.send({"response": "Success"}); 
        }

    })

})

router.post('/get/:name', (req, res) => { 
    const name = req.params.name
    let newPassword = req.body.password; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const user = mongoose.model('User', userSchema); 

    try { 

    user.find({userID: name}, function (err, users) { 

        if (err) res.send(err); 

        if (users.length <= 0) {
            res.send({"error": "Incorrect username/password"})
        }
        else { 

            if (bcrypt.compareSync(newPassword, users[0].password)) { 
                res.send(users); 
            }
            else { 
                res.send({"error": "Incorrect username/password"}); 
            }
        }
    })
    }
    catch (error) { 
        console.log(error); 
        res.send({"error": error}); 
    }
})

router.post('/updateUsernameFacebook', (req, res) => { 
    let fbid = req.body.fbid;
    let userID = req.body.userID;  

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema); 

    let conditions = {fbid: fbid}, 
        update = {userID: userID}, 
        options = {mulit: true};  

    try { 
        User.update(conditions, update, options, function (err, numAffected) { 
            if (err) res.send(err); 
            console.log(numAffected);
            
            User.findOne({fbid: fbid}, function (err, users) { 
                res.send(users); 
            })

        })
    }
    catch (e) { 
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

router.post('/facebookLogin', (req, res) => { 
    let fbid = req.body.fbid; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema); 

    try { 

        User.find({fbid: fbid}, function (err, users) { 
            console.log(users); 
            if (err) res.send(err); 

            if (users.length <= 0) { 
                //add user to database with facebook id
                var newUser = new User({
                    fbid: fbid, 
                    karma: 0, 
                    userID: "", 
                    password: ""
                })

                newUser.save((error) => { 
                    console.log(error); 
                })

                res.send(newUser); 
            }
            else { 
                res.send(users); 
            }
        })
    }
    catch (e) { 
        console.log(e); 
        res.send({"error" : e}); 
    }
})


module.exports = router; 