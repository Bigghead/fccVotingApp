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
  console.log(vote);
  var id = req.params.id;

  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      var dataArray = [];

      for(var i = 0 ; i < foundPoll.items.length; i ++){

        if(foundPoll.items[i].name === vote){
          var stringID = id.toString();
          if(req.cookies.stringID === '' || req.cookies.stringID === null){ //if user hasn't voted
          res.cookie(stringID, vote);
          foundPoll.items[i].count += 1;
          console.log(req.cookies);
          foundPoll.save();
          }
         }
        dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
       }
       if(req.cookies.stringID){
         res.send('Ha Ha!');
       } else {
       res.render('show', {foundPoll:foundPoll, dataArray: dataArray});
     }
    }
  });
});

//Show Route
app.get('/polls/:id', function(req, res){
  var id = req.params.id;
  console.log(req.cookies);

  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      var dataArray = [];

      for(var i = 0 ; i < foundPoll.items.length; i ++){
        dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
      }
      res.render('show', {foundPoll:foundPoll, dataArray: dataArray});
    }
  });
});

app.listen('7000', function(){
  console.log('Voting Site Live!');
});
