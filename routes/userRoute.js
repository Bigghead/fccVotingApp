var express = require('express'),
    mongoose = require('mongoose'),
    router  = express.Router(),
    Polls   = require('../models/pollSchema.js'),
    User    = require('../models/userSchema.js');

router.get('/:id/userPolls', isLoggedIn,function(req, res){
  res.send('Here are your Polls');
});

router.get('/:id/userPolls/createPoll', isLoggedIn, function(req, res){
  var id = req.params.id;
  res.render('newPollPage', {id : id});
});

router.post('/:id/userPolls/createPoll', isLoggedIn, function(req, res){
  console.log(req.body.pollOptions.split(','));
  var id = req.params.id;
  var pollOptions = req.body.pollOptions.split(',');
  var pollName = req.body.pollName;
  var userPollData = [];
  for(var i =  0 ; i < pollOptions.length; i ++){
    userPollData.push({name : pollOptions[i], count: 1});
  }
  User.findById(id, function(err, foundUser){
    if(err){
      console.log(err);
    } else {
      Polls.create({
        pollName : pollName,
        items : userPollData
      }, function(err, madePoll){
        if(err){
          console.log(err);
        } else {
          foundUser.polls.push(madePoll);
          madePoll.save();
          foundUser.save();
          res.redirect('/polls');
        }
      });
    }
  });
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.render('login');
  }
}
module.exports = router;
