var mongoose = require('mongoose'),
    express = require('express'),
    app = express();

var pollSchema = new mongoose.Schema({
  pollName : String,
  items: [
    {name: String, count: Number}
  ]
});

var Polls = mongoose.model('Poll', pollSchema);


var newPoll = [
  {name: 'Darth Vader', count: 1},
  {name: 'Thanos', count: 1},
  {name: 'King Joffrey', count: 1},
  {name: 'Nyan Cat', count: 1},
  {name: 'Ice King', count: 1},
  {name: 'Future You', count: 1},
];

module.exports = Polls;
