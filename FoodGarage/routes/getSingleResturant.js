var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://127.0.0.1:27017';

router.get('/', function(req, res, next) {
    var code = '';
    var code = req.query.code ? req.query.code : '';
    var data = {"singleProduct" : []};
    mongoClient.connect(dburl, (error, client) =>{
        var db = client.db("Foodgarage");
        var collection = db.collection("getSingleResturant");

        collection.find({code: code}).toArray((error, details) =>{
            data.singleProduct = details;
            res.send(JSON.stringify(data));
            console.log(details);
        })
    })
});

module.exports = router;