var mongoose = require('mongoose'),
    express  = require('express'),
    cookieParser = require('cookie-parser'),
    Polls    = require('../models/pollSchema.js'),
    router   = express.Router();


router.use(cookieParser());
//Add Survey Route
router.post('/polls/:id', function(req, res){
  var vote = req.body.vote;
  var id = req.params.id;
  var dataArray = [];

  if(req.cookies[id.toString()] === undefined || req.cookies[id.toString()] === ''){
    res.cookie(id, vote);


  Polls.findById(req.params.id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {

      for(var i = 0 ; i < foundPoll.items.length; i ++){

        if(foundPoll.items[i].name === vote){
          foundPoll.items[i].count += 1;
          foundPoll.save();
         }
         dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
        }
        res.redirect('/polls/' + id );
      }
  });
 }
});

router.post('/polls/:id/addedVote', isLoggedIn, function(req, res){
  var id = req.params.id;
  var addedVote = req.sanitize(req.body.addedUserPoll);
  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      console.log(foundPoll);
      foundPoll.items.push({name: addedVote, count: 1});
      res.cookie(id, addedVote);
      foundPoll.save();
      res.redirect('/polls');
    }
  });
});

//Show Route
router.get('/polls/:id', function(req, res){
  var id = req.params.id;

  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      var dataArray = [];

      for(var i = 0 ; i < foundPoll.items.length; i ++){
        dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
      }
      if(req.cookies[id.toString()] === undefined || req.cookies[id.toString()] === ''){
      res.render('show', {foundPoll:foundPoll, dataArray: dataArray, cookies: req.cookies});
    } else {
      res.render('hasVoted', {foundPoll:foundPoll, dataArray: dataArray, storedCookie: req.cookies[id.toString()]});
    }
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
