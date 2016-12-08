var express = require('express'),
    router  = express.Router(),
    Polls   = require('../models/polls.js');

router.get('/', function(req, res){
  res.redirect('polls');
});

//Index Route
router.get('/polls', function(req, res){
  Polls.find({}, function(err, polls){
    if(err){
      console.log(err);
    } else {
      res.render('polls', {polls: polls});
    }
  });
});


module.exports = router;
