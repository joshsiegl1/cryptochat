var express = require("express"), 
router = express.Router(); 

const MongoClient = require("mongodb").MongoClient
const mongoose = require("mongoose"); 

const url = require("./Config.js").MongoDBConnectionString; 


module.exports = router; 