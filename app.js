var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


//mongoose/mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/polls');

var pollSchema = new mongoose.Schema({
  pollName : String,
  items: [
    {name: String, count: Number}
  ]
});

var Polls = mongoose.model('Poll', pollSchema);


var newPoll = [
  {name: 'Darth Vader', count: 1},
  {name: 'Thanos', count: 1},
  {name: 'King Joffrey', count: 1},
  {name: 'Nyan Cat', count: 1},
  {name: 'Ice King', count: 1},
  {name: 'Future You', count: 1},
];

// Polls.create({
//   pollName : 'Favorite Villain',
//   items: newPoll,
//   hasVoted: false,
//   userVote: ''
//
// }, function(err, result){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });


app.get('/', function(req, res){
  res.render('landing');
});

//Index Route
app.get('/polls', function(req, res){
  Polls.find({}, function(err, polls){
    if(err){
      console.log(err);
    } else {
      res.render('polls', {polls: polls});
    }
  });
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
