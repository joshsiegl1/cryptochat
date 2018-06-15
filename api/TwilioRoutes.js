var express = require("express"), 
router = express.Router(); 

const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose"); 

var phoneCodeSchema = require("./models/phoneCode_model.js");
var userSchema = require("./models/user_model.js");  
var authSchema = require('./models/authToken_model.js'); 

const url = require("./Config.js").MongoDBConnectionString; 

const twilio = require('twilio'); 

const accountSid = require("./Config.js").accountSid; 
const auth_token = require("./Config.js").auth_token; 
const phoneNumber = require("./Config.js").phoneNumber; 

const client = new twilio(accountSid, auth_token); 

function getRandom() { 
    return Math.floor(Math.random() * Math.floor(99999)); 
}

router.post('/', (req, res) => { 

    let newNumber = req.body.phone; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const phoneCode = mongoose.model('phoneCode', phoneCodeSchema); 
    const authToken = mongoose.model('authToken', authSchema); 

    let code = 0;
    while (code < 10000) { 
        code = getRandom(); 
    } 

    let date = new Date();
    date.setHours(date.getHours() + 1);  
    var newPhoneCode = new phoneCode({
        phone: newNumber, 
        code: code, 
        expires: date
    })

    let newauth = { 
        phone: newNumber, 
        code: code
    }

    var newAuthToken = new authToken(newauth)

    newPhoneCode.save((error) => { 
        if (error) { 
            res.send(error); 
            console.log(error); 
        }
    })

    authToken.findOneAndUpdate({'phone': newNumber}, newauth, {upsert:true}, function(err, doc) { 
        if (err) return res.send(500, {error: err}); 
    })

    let body = "Cryptochat code - " + code; 

    client.messages.create({
        body: body, 
        to: newNumber, 
        from: phoneNumber
    })

    res.send({"message": "success"}); 
})

router.post('/submit', (req, res) => { 
    let code = req.body.code; 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const phoneCode = mongoose.model('phoneCode', phoneCodeSchema); 
    const User = mongoose.model('User', userSchema); 
    const authToken = mongoose.model('authToken', authSchema); 

    let userphone = ''; 

    phoneCode.findOne({code: code}, function (err, result) { 
        if (!err) { 
            if (!result) { 
                res.send({"error":"invalid code"}); 
            }
            else { 
                authToken.findOne({code: code, phone: result.phone}, function (err, auth) { 
                    if (!err) { 
                        if (!auth) { 
                            res.send(500, {error: err})
                        }
                        else { 
                            User.findOne({phone: result.phone}, function (err, user) { 
                                if (!err) { 
                                    if (!user) { 
                                        var newUser = new User({
                                            email: '', 
                                            karma: 1, 
                                            phone: result.phone
                                        })
                                        newUser.save(function(err) { 
                                            if (err) console.log(err); 
                                        })
                                    }
                                    
                                    phoneCode.remove({code: code}, function (err) { 
                                        if (err) res.send(500, {error: err}); 
                                    })
            
                                    res.send({phone: result.phone, 
                                              error: null}); 
                                }
                                else { 
                                    res.send({error}); 
                                }
                            })
                        }
                    }
                })

            }
        }
    })

})

module.exports = router; 