const fetch = require("node-fetch"); 

var express = require("express"); 
router = express.Router(); 

const MongoClient = require("mongodb").MongoClient; 
const mongoose = require("mongoose"); 

const url = require("./Config.js").MongoDBConnectionString; 
const cmc_key = require("./Config").CMC_KEY; 

const cmchost = "pro-api.coinmarketcap.com"; 
const cmcendpoint = "/v1/cryptocurrency/listings/latest"; 

const cmc_url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"; 

router.get('/', async (req, res) => { 
    
    try { 

        var options = { 
            method: 'get', 
            headers: { 
                'X-CMC_PRO_API_KEY' : cmc_key
            }
        }

        const response = await fetch(cmc_url, options)
        .then(res => res.json())
        .then(json => console.log(json)); 

        res.send({"message" : "success"})
    }
    catch (e) { 
        res.send({"message" : "error"}); 
    }

})

module.exports = router; 