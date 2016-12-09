var express = require('express'),
    mongoose = require('mongoose'),
    router  = express.Router(),
    Polls   = require('../models/pollSchema.js');

router.get('/userPolls', function(req, res){
  res.send('Here are your Polls');
});

router.get('/userPolls/createPoll', function(req, res){
  res.render('newPollPage');
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.render('login');
  }
}
module.exports = router;
