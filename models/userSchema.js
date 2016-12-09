var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username : String,
  password : String,
  polls :[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Poll'
    }
  ]
});

//plug in passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;
