var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://127.0.0.1:27017';


/* GET home page. */
router.post('/', function(req, res, next) {
    var userSearchText = req.body.searchText ? req.body.searchText : '';
    console.log(userSearchText);
    var restruarantDetails = {
        details: []
    } 
    mongoClient.connect(dburl, (error, client) =>{
        var db = client.db("Foodgarage");
        var collection = db.collection("resturantDetails");
        var searchPattern ;
        if(userSearchText == ''){
            searchPattern = {};
        }else{
            searchPattern = {name: {$regex: new RegExp(userSearchText, 'gi')}}
        }
        collection.find(searchPattern).toArray((error, resData) =>{
            restruarantDetails.details = resData;
            res.send(JSON.stringify(restruarantDetails));
        })
    })
});

module.exports = router;