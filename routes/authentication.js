var express  = require('express'),
    mongoose = require('mongoose'),
    router   = express.Router(),
    passport = require('passport'),
    User     = require('../models/userSchema.js');


//========REGISTER ROUTES=======
router.get('/register', function(req, res){
  res.render('registerForm');
});

router.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

    User.register(new User({username: username}), password,
    function(err, registeredUser){
      if(err){
        console.log(err);
        res.render('resgisterForm');
      } else {
        passport.authenticate('local')(req, res, function(){
          res.redirect('/polls');
        });
      }
    });
});


//========LOGIN ROUTES=========
router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  var userName = req.body.userName;
  var password = req.body.Password;

  console.log(userName +  password);
  res.send(userName + password);
});


module.exports = router;
