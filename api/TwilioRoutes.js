var express = require("express"), 
router = express.Router(); 

const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose"); 

var phoneCodeSchema = require("./models/phoneCode_model.js"); 

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

    let code = 0;
    while (code < 10000) { 
        code = getRandom(); 
    } 

    let date = new Date();
    date.setHours(date.getHours() + 1);  
    var newPhoneCode = new phoneCode({
        code: code, 
        expires: date
    })

    newPhoneCode.save((error) => { 
        if (error) { 
            res.send(error); 
            console.log(error); 
        }
    })

    let body = "Cryptochat code - " + code; 

    client.messages.create({
        body: body, 
        to: newNumber, 
        from: phoneNumber
    })

    res.send({"message": "success"}); 
})

module.exports = router; 