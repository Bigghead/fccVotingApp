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
app.post('/polls', function(req, res){
  console.log(req.body);
  res.redirect('')
});

//Show Route
app.get('/polls/:id', function(req, res){
  var id = req.params.id;

  Polls.findById(id, function(err, foundPoll){
    if(err){
      console.log(err);
    } else {
      res.render('show', {foundPoll:foundPoll});
    }
  });
});

app.listen('5000', function(){
  console.log('Voting Site Live!');
});
