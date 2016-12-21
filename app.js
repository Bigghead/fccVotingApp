require('dotenv').config();


var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport     = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Session      = require('express-session'),
    expressSanitizer = require('express-sanitizer'),
    app          = express();

    //models imports
var Polls  = require('./models/pollSchema.js'),
    User   = require('./models/userSchema.js');

//Route imports
var indexRoute = require('./routes/index.js'),
    pollRoute  = require('./routes/polls.js'),
    authRoute  = require('./routes/authentication.js'),
    userRoute  = require('./routes/userRoute.js'),
    seed       = require('./routes/seedData.js');

//mongoose/mongo connection
mongoose.Promise = global.Promise;
var url = process.env.url;
console.log(process.env);
mongoose.connect(url);


// seed();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(expressSanitizer());
app.use(express.static(__dirname + '/public'));



//Session / passport
app.use(Session({
  secret: 'This is Sparta Again',
  resave :false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//tell express to use routes
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
app.use(indexRoute);
app.use(pollRoute);
app.use(authRoute);
app.use(userRoute);

//use passport to authenticate
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT || 8000, function(){
  console.log('Voting Site Live!');
});
