var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    req.session.isUserLoggedin = false;
    req.session.destroy();
    res.send(JSON.stringify({status: "done"}));
});

module.exports = router;