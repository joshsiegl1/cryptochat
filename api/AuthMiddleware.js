const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose"); 
var authSchema = require('./models/authToken_model.js'); 

function AuthMiddleware(req, res, next) { 
    
    const token = req.get('cryptochat-token-x'); 
    if (!token) { 
        res.send(301, {error: 'error authenticating: no auth token included in the request'}); 
    }
    else { 
        mongoose.connect(url, {useMongoClient: true}); 
        const db = mongoose.connection; 
        const authToken = mongoose.model('authToken', authSchema); 
        authToken.findOne({token: token}, function (err, auth) { 
            if (!err) { 
                next();
            } 
        })
    }

    res.send(301, {error: "error authenticating: no auth token found"}); 
}

module.exports = AuthMiddleware; 