var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://127.0.0.1:27017';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';



/* GET home page. */
router.post('/', function(req, res, next) {
    var data = {};
    mongoClient.connect(dburl, (error, client) =>{
        var db = client.db("Foodgarage");
        var collection = db.collection("userLoginDetails");
        bcrypt.hash(req.body.accountPwd, saltRounds, function(err, hash){
            req.body.accountPwd = hash;
            collection.insertOne(req.body, () => {
                if (error) {
                    data.msg = "Error while inserting data";
                    data.status = 'failed';
                }else{
                    data.msg = "Successfully user got registered";
                    data.status = 'Success';
                }
                res.send(JSON.stringify(data));
            });
        });  
    })
});

module.exports = router;