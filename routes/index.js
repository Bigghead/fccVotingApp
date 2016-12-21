var express = require('express'),
    router  = express.Router(),
    cookieParser = require('cookie-parser'),
    Polls   = require('../models/pollSchema.js');


router.use(cookieParser());
router.get('/', function(req, res){
  res.redirect('polls');
});

//Index Route
router.get('/polls', cookieParser(), function(req, res){
  Polls.find({}, function(err, polls){
    if(err){
      console.log(err);
    } else {
      res.render('polls', {polls: polls});
    }
  });
});

//CHART.JS
router.get('/polls/chartJS', function(req, res){
  Polls.findById('5855bb4bee527a2374f54be5', function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      res.render('chartShow', {foundPoll : foundPoll});
    }
  });
});


module.exports = router;
