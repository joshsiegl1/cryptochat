const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose"); 
var authSchema = require('./models/authToken_model.js'); 
const url = require("./Config.js").MongoDBConnectionString; 
const jwt = require("jsonwebtoken"); 
const jwtSecret = require("./Config.js").jwtSecret; 

function AuthMiddleware(req, res, next) { 
    
    const token = req.get('cryptochat-token-x'); 
    if (!token) { 
        res.send(403, {error: 'error authenticating: no auth token included in the request'}); 
    }
    else { 

        jwt.verify(token, jwtSecret, function (err, decoded) { 
            if (decoded === undefined) { 
                res.send(403, {error: 'error authenticating: invalid jwt'})
            }
            else { 
                next(); 
            }
        })

        // mongoose.connect(url, {useMongoClient: true}); 
        // const db = mongoose.connection; 
        // const authToken = mongoose.model('authToken', authSchema); 
        // authToken.findOne({token: token.toString()}, function (err, auth) { 
        //     if (!err) { 
        //         if (auth === null) { 
        //             res.send(403, {error: "error authenticating: no auth token found " + token.toString()}); 
        //         }
        //         else next();
        //     } 
        // })
    }
}

module.exports = AuthMiddleware; 