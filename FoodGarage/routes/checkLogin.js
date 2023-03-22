var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var data = {
    isUserLoggedin : ''
  }
  if (req.session.isUserLoggedin) {
    data.isUserLoggedin = true;
  }else{
    data.isUserLoggedin = false;
  }
  res.send(JSON.stringify(data));
});

module.exports = router;