var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));


//mongoose/mongo connection
mongoose.connect('mongodb://localhost/polls');

var pollSchema = new mongoose.Schema({
  pollName : String,
  item1: {
   name: String,
   count:  Number
 },
  item2:{
    name: String,
    count: Number
  },
  item3:{
    name: String,
    count: Number
  }
});

var Polls = mongoose.model('Poll', pollSchema);

var hasVoted = false;

// Polls.create({
//   pollName : 'Favorite Starter Pokemon',
//   item1:{
//     name: 'Charmander',
//     count: 1
//   },
//   item2:{
//     name: 'Squirtle',
//     count: 1
//   },
//   item3:{
//     name: 'Bulbasaur',
//     count: 1
//   }
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
      var dataArray = [
        [foundPoll.item1.name, foundPoll.item1.count],
        [foundPoll.item2.name, foundPoll.item2.count],
        [foundPoll.item3.name, foundPoll.item3.count]
      ];
      for(var i = 0 ; i < dataArray.length; i ++){
        if(dataArray[i][0] === vote){
          dataArray[i][1] += 1;

          // foundPoll.
        }
      }
      res.render('show', {foundPoll:foundPoll, dataArray: dataArray});
    }
  });
});

//Show Route
app.get('/polls/:id', function(req, res){
  var id = req.params.id;

  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      var dataArray = [
        [foundPoll.item1.name, foundPoll.item1.count],
        [foundPoll.item2.name, foundPoll.item2.count],
        [foundPoll.item3.name, foundPoll.item3.count]
      ];
      res.render('show', {foundPoll:foundPoll, dataArray: dataArray});
    }
  });
});

app.listen('5000', function(){
  console.log('Voting Site Live!');
});
