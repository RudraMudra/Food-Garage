var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var dburl = 'mongodb://127.0.0.1:27017';
var bcrypt = require('bcrypt');

router.post('/', (request, response) =>{
    var data = {};
    mongoClient.connect(dburl, (error, client) =>{
        if(error){
            data.msg = "Error while connecting to db server";
        }
        var db = client.db("Foodgarage");
        var collection = db.collection("userLoginDetails");
        collection.find({
            userAccountId: request.body.userAccountId
           // accountPwd: request.body.acctPwd
        }).toArray((error, details) =>{
            if(error){
                data.msg = "Error while connecting to collection";
            }else{
                console.log(details);
                bcrypt.compare(request.body.acctPwd,details[0].accountPwd,function(err, result){
                    if (result) {
                        request.session.isUserLoggedin = true;
                        data.msg = 'valid User';
                    data.status = 'Success';
                    }else{
                        request.session.isUserLoggedin = false;
                        data.msg = 'Invalid credentials';
                        data.status = 'Error';
                    }
                    response.send(JSON.stringify(data));
                });
            }
        })
    })   
});

module.exports = router;