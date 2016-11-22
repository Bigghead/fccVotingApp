var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
  res.render('index');
});

app.listen('5000', function(){
  console.log('Voting Site Live!');
});
