var express = require('express'),
    mongoose = require('mongoose'),
    router  = express.Router(),
    Polls   = require('../models/pollSchema.js'),
    User    = require('../models/userSchema.js');

router.get('/:id/userPolls', isLoggedIn,function(req, res){
  var id = req.params.id;
  User.findById(id).populate('polls').exec(function(err, foundUser){
    res.render('allUserPoll', {foundUser : foundUser});
  });
});

router.post('/:userID/userPolls/:pollID', function(req, res){
  var userID = req.params.userID;
  //this id is the poll id, and not the user's
  var pollID = req.params.pollID;

  Polls.findByIdAndRemove(pollID, function(err, success){
    if(err){
      console.log(err);
    } else{
      console.log('Removed' );
      User.findById(userID).populate('polls').exec(function(err, foundUser){
        if(err){
          console.log(err);
        } else {
          console.log(foundUser.polls);
          for(var i = 0 ; i < foundUser.polls.length; i ++){
            if(foundUser.polls[i][_id] === pollID){
              console.log(foundUser.polls[i]);
              foundUser.polls.splice(i, 1);
              console.log(foundUser.polls);
            }
          }
            res.redirect('/polls');
          }
        });
      }
  });
});

router.get('/:id/userPolls/createPoll', isLoggedIn, function(req, res){

  var id = req.params.id;
  res.render('newPollPage', {id : id});
});

// router.post('/:id/userPolls/createPoll', function(req, res){
//   //console.log(req.params.id);
//   res.send('Safe');
// });

router.post('/:id/userPolls', isLoggedIn, function(req, res){

  var id = req.params.id;
  console.log(id);
  console.log('id: ' + id + typeof id);
  var pollOptions = req.body.pollOptions.split(',');
  var pollName = req.body.pollName;
  var userPollData = [];
  for(var i =  0 ; i < pollOptions.length; i ++){
    userPollData.push({name : pollOptions[i], count: 1});
  }
  console.log(userPollData);
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
