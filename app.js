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
  items: [
    {name: String, count: Number},
    {name: String, count: Number},
    {name: String, count: Number}
  ],
  hasVoted : Boolean
});

var Polls = mongoose.model('Poll', pollSchema);

var hasVoted = false;

var newPoll = [
  {name: 'Morning', count: 1},
  {name: 'Noon', count: 1},
  {name: 'Sleep', count: 1},
  {name: 'Coffee', count: 1}
];

// Polls.create({
//   pollName : 'Best Time of Day',
//   items: newPoll,
//   hasVoted: false
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
      // var dataArray = [
      //   [foundPoll.items[0].name, foundPoll.items[0].count],
      //   [foundPoll.items[1].name, foundPoll.items[1].count],
      //   [foundPoll.items[2].name, foundPoll.items[2].count]
      // ];
      for(var i = 0 ; i < foundPoll.items.length; i ++){
        if(foundPoll.items[i].name === vote){
          foundPoll.items[i].count += 1;
          foundPoll.save();
        }
        dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
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
      console.log(foundPoll);
      var dataArray = [];

      for(var i = 0 ; i < foundPoll.items.length; i ++){
        dataArray.push([foundPoll.items[i].name, foundPoll.items[i].count]);
      }
      res.render('show', {foundPoll:foundPoll, dataArray: dataArray});
    }
  });
});

app.listen('8000', function(){
  console.log('Voting Site Live!');
});
