var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport     = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Session      = require('express-session'),

    //models imports
    Polls        = require('./models/pollSchema.js'),
    User         = require('./models/userSchema.js'),
    app          = express();

//Route imports
var indexRoute = require('./routes/index.js'),
    pollRoute  = require('./routes/poll.js');
    authRoute  = require('./routes/authentication.js');

//mongoose/mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/polls');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//Session / passport
app.use(Session({
  secret:'This is Sparta!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//middleware to check if user is authenticated
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//use passport to authenticate
// passport.use(new localStrategy(userSchema.authenticate()));
//
// passport.serializeUser(userSchema.serializeUser());
// passport.deserializeUser(userSchema.deserializeUser());


//Test for adding new polls
// Polls.create({
//   pollName: 'Your favorite soda',
//   items:[
//     {name: 'Pepsi', count: 1},
//     {name: 'Coke', count: 1},
//     {name: '7 Up', count: 1},
//     {name: 'Starbucks?', count: 1},
//     {name: 'Grape Drink', count: 1},
//     {name: 'What\'s soda?', count: 1},
//     {name: 'Dr. Pepper', count: 1},
//     {name: 'Fanta', count: 1}
//   ]
// }, function(err, madePoll){
//   if(err){
//     console.log(err);
//   } else {
//     console.log('Success');
//   }
// });

//tell express to use routes
app.use(indexRoute);
app.use(pollRoute);
app.use(authRoute);



app.listen('7000', function(){
  console.log('Voting Site Live!');
});
