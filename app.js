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
  item1: String,
  item2: String,
  item3: String
});

var Polls = mongoose.model('Poll', pollSchema);

// Polls.create({
//   pollName : 'Favorite Comfort Food',
//   item1: 'Pizza',
//   item2: 'Burgers/Fries',
//   item3: 'Coffee'
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
        [foundPoll.item1, 1],
        [foundPoll.item2, 1],
        [foundPoll.item3, 1]
      ];
      for(var i = 0 ; i < dataArray.length; i ++){
        if(dataArray[i][0] === vote){
          dataArray[i][1] += 1;
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
        [foundPoll.item1, 1],
        [foundPoll.item2, 1],
        [foundPoll.item3, 1]
      ];
      res.render('show', {foundPoll:foundPoll, dataArray: dataArray});
    }
  });
});

app.listen('5000', function(){
  console.log('Voting Site Live!');
});
