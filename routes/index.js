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




module.exports = router;
