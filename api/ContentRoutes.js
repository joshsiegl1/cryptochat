var express = require('express'), 
    router = express.Router(); 

const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose")

const url = require('./Config.js').MongoDBConnectionString; 

//require('dotenv').config(); 

const aws = require('aws-sdk'); 
const S3_BUCKET = 'cryptochat-app-45'; 
aws.config.loadFromPath('./aws_config.json'); 

router.get('/sign_s3', (req, res) => { 
    const s3 = new aws.S3({
        apiVersion: '2006-03-01'
    }); 
    const fileName = req.query['file-name']; 
    const fileType = req.query['file-type']; 
    const s3Params = { 
        Bucket: S3_BUCKET, 
        Key: fileName
    }; 

    console.log(fileName); 
    console.log(fileType); 
    console.log(req); 
    console.log(req.query['file-name']); 
    console.log(req.query['file-type']); 
    console.log(s3Params); 

    s3.getSignedUrl('putObject', s3Params, (err, data) => { 
        if (err) { 
            console.log(err); 
            return res.end(); 
        }

        console.log(data); 

        const returnData = { 
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        }; 

        res.write(JSON.stringify(returnData)); 
        res.end(); 
    })
})

router.post('/link', (req, res) => { 
    mongoose.connect(url, {useMongoClient: true})
    const db = mongoose.connection; 

    var Link = mongoose.model('Link', linkSchema)

    let links = req.body.links; 
    for (let i = 0; i < links.length; i++) { 
        var link = new Link({
            id: links[i].id, 
            name: links[i].name, 
            url: links[i].url
        })

        link.save((error) => { 
            if (error) { 
                console.log(error); 
            }
        })
    }

    res.send({"response" : "Success"}); 
})

module.exports = router; 