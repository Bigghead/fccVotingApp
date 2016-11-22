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
  pollName : String
});

var Polls = mongoose.model('Poll', pollSchema);


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
