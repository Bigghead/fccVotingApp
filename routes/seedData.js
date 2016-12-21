var mongoose = require('mongoose'),
    express  = require('express'),
    cookieParser = require('cookie-parser'),
    Polls    = require('../models/pollSchema.js');


var data = [
  {
  pollName: "Who's Your Favorite Villain?",
  items:[
    {name: 'Darth Vader', count: 1},
    {name: 'Thanos', count: 1},
    {name: 'King Joffrey', count: 1},
    {name: 'Nyan Cat', count: 1},
    {name: 'Ice King', count: 1},
    {name: 'Future You', count: 1},
  ]},
  {
    pollName : 'Your Favorite Time of Day',
    items: [
      {name: 'Morning', count: 1},
      {name: 'Coffee', count: 1},
      {name: 'Afternoon', count: 1},
      {name: 'Dinner', count: 1},
      {name: 'Sleep', count: 1},
      {name: 'Food', count: 1},
      {name: 'Phone', count: 1},
      {name: 'Dog Walk', count: 1}
    ]
  },
  {
    pollName : 'Favorite Kind of Snack',
    items:[
      {name: 'Candy', count: 1},
      {name: 'Chips', count: 1},
      {name: 'Ice Cream', count: 1},
    ]
  },
  {
    pollName : 'Worst Soda',
    items:[
      {name: 'Pepsi', count: 1},
      {name: 'Coke', count: 1},
      {name: 'Dr. Pepper', count: 1},
    ]
  }
];


function seed(){

  Polls.remove({}, function(err, success){
    if(err){
      console.log(err);
    } else {
      data.forEach(function(poll){
        Polls.create(poll, function(err, addedPoll){
          if(err){
            console.log(err);
          } else {
            console.log('Added: '+ poll.pollName);
          }
        });
      });
    }
  });
}

module.exports = seed;
