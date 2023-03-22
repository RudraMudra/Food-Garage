var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://127.0.0.1:27017';


/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {};
    mongoClient.connect(dburl, (error, client) =>{
        var db = client.db("Foodgarage");
        var collection = db.collection("resturantDetails");
        collection.insertOne(req.query, (error) =>{
            if (error) {
                data.msg = 'Error';
            }else{
                data.msg = 'Success';
            }
            res.send(JSON.stringify(data));
        })
    });
});

module.exports = router;