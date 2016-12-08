var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport     = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),

    //models imports
    Polls        = require('./models/polls.js'),
    app          = express();

//Route imports
var indexRoute = require('./routes/index.js');

//tell express to use routes
app.use(indexRoute);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


//mongoose/mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/polls');


//login Route
app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  var userName = req.body.userName;
  var password = req.body.Password;

  console.log(userName +  password);
  res.send(userName + password);
});

//Update Survey
app.post('/polls/:id', function(req, res){
  var vote = req.body.vote;
  console.log('Vote:' + vote);
  var id = req.params.id;
  console.log('ID: ' + id);
  console.log(req.cookies);
  console.log(req.cookies[id.toString()] !== '');

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
app.get('/polls/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  console.log(req.cookies);
  console.log(req.cookies[id.toString()]);

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

app.listen('7000', function(){
  console.log('Voting Site Live!');
});
