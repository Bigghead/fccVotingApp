var express = require('express'),
    mongoose = require('mongoose'),
    router  = express.Router(),
    Polls   = require('../models/pollSchema.js');

router.get('/userPolls', function(req, res){
  res.send('Here are your Polls');
});
