var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

app.use('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
  res.render('index');
});

app.listen('6000', function(){
  console.log('Voting Site Live!');
});
