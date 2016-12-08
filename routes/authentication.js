var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    User = require('../models/userSchema.js'),
    router  = express.Router();


//========REGISTER ROUTES=======
router.get('/register', function(req, res){
  res.render('registerForm');
});

router.post('/register', bodyParser.urlencoded({extended: false}), function(req, res){

  var username = req.body.username;
  var password = req.body.password;

    User.register(new User({username: username}), password,
    function(err, registeredUser){
      if(err){
        console.log(err);
        res.render('registerForm');
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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/polls',
  failureRedirect: '/login'
}), function(req, res){

});


//===========LOGOUT=========
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/polls');
});


module.exports = router;
