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

Polls.create({pollName : 'Favorite Super Villain'}, function(err, result){
  if(err){
    console.log(err);
  } else {
    console.log('Poll Successfully Added: ' + result);
  }
});

app.get('/', function(req, res){
  res.render('landing');
});

app.get('/polls', function(req, res){
  res.render('polls');
});

app.listen('5000', function(){
  console.log('Voting Site Live!');
});
