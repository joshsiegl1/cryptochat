const express = require('express')
const bodyParser = require("body-parser"); 
const bcrypt = require("bcrypt"); 
const app = express()
const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

const url = require("./Config.js").MongoDBConnectionString; 

var chatSchema = require("./models/chat_model.js"); 
var userSchema = require("./models/user_model.js"); 

var port = process.env.PORT || 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.post('/user', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const User = mongoose.model('User', userSchema)

    let body = req.body; 
    bcrypt.hash(body.password, 10, function(err, hash) { 
        var newUser = new User({
            karma: body.karma, 
            userID: body.userID, 
            password: hash
        }); 

        newUser.save((error) => { 
            if (error) console.log(error); 
        })
    })

    res.send("Success"); 
})

app.post('/user/:name', (req, res) => { 
    const name = req.params.name
    let newPassword = req.body.password; 

    console.log(newPassword); 
    console.log(req.body);
    console.log(req.body.password);  
    console.log(name); 

    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection

    const user = mongoose.model('User', userSchema); 

    user.find({userID: name}, function (err, users) { 

        if (err) res.send(err); 

        if (bcrypt.compareSync(newPassword, users[0].password)) { 
            res.send(users); 
        }
        else { 
            res.send("Incorrect username/password"); 
        }
    })
})

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

    chats.find({id: crypto}, function(err, chats) { 
        if (err) { 
            res.send(err); 
        }
        else { 
            res.send(chats); 
        }
    }); 
})

app.listen(port, () => console.log('Example app listening on port 3000!'))

