const fetch = require("node-fetch"); 

var express = require("express"); 
router = express.Router(); 

const MongoClient = require("mongodb").MongoClient; 
const mongoose = require("mongoose"); 

const url = require("./Config.js").MongoDBConnectionString; 
const cmc_key = require("./Config").CMC_KEY; 

const cmchost = "pro-api.coinmarketcap.com"; 
const cmcendpoint = "/v1/cryptocurrency/listings/latest"; 

var categorySchema = require('./models/category_model.js'); 

const cmc_url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1000"; 

router.get('/', async (req, res) => { 
    
    try { 

        var options = { 
            method: 'get', 
            headers: { 
                'X-CMC_PRO_API_KEY' : cmc_key
            }
        }

        mongoose.connect(url, {useMongoClient: true})
        const db = mongoose.connection

        const categories = mongoose.model('categories', categorySchema); 

        const response = await fetch(cmc_url, options)
        .then(res => res.json())
        .then(json => { 

            const data = json.data; 

            var bulk = categories.collection.initializeUnorderedBulkOp(); 
            data.forEach(element => {
                var query = {}; 
                const reducedElement = { 
                    name: element.name, 
                    slug: element.slug, 
                    cmc_rank: element.cmc_rank, 
                    cmc_id: element.id, 
                    id: element.id, 
                    source: `https://s2.coinmarketcap.com/static/img/coins/64x64/${element.id}.png`
                }
                query['name'] = reducedElement['name']; 
                bulk.find(query).upsert().updateOne(reducedElement); 
            });

            bulk.execute(function (err, bulkres){ 
                if (err) res.send({"bulk error" : err.message}); 
            })

            res.send({"success" : data})
        }); 
    }
    catch (e) { 
        res.send({"message" : e.message}); 
    }

})

module.exports = router; 