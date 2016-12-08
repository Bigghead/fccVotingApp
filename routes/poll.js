var mongoose = require('mongoose'),
    express  = require('express'),
    cookieParser = require('cookie-parser'),
    Polls    = require('../models/pollSchema.js'),
    router   = express.Router();


router.use(cookieParser());
//Add Survey Route
router.post('/polls/:id', function(req, res){
  var vote = req.body.vote;
  console.log('Vote:' + vote);
  var id = req.params.id;
  console.log('ID: ' + id);

  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      var dataArray = [];

      for(var i = 0 ; i < foundPoll.items.length; i ++){

        if(foundPoll.items[i].name === vote){
          if(req.cookies[id.toString()] === undefined || req.cookies[id.toString()] === ''){
          res.cookie(id, vote);
          foundPoll.items[i].count += 1;
          foundPoll.save();
           }
         }
         dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
        }
       }
       if(req.cookies[id.toString()] === undefined || req.cookies[id.toString()] === ''){
       res.render('show', {foundPoll:foundPoll, dataArray: dataArray, cookies: req.cookies});
     } else {
       res.render('hasVoted', {foundPoll:foundPoll, dataArray: dataArray, storedCookie: req.cookies[id.toString()]});
     }
  });
});

//Show Route
router.get('/polls/:id', function(req, res){
  var id = req.params.id;
  console.log(id);

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

module.exports = router;
