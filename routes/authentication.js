var express  = require('express'),
    mongoose = require('mongoose'),
    router   = express.Router(),
    passport = require('passport');


//========REGISTER ROUTES=======
router.get('/register', function(req, res){
  res.render('registerForm');
});

// router.post('/register', function(req, res){
//   var
// });


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
