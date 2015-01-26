var port = process.env.PORT || 3000;

var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');

var db = require('../db/db.js');
var Rooms = require('../db/models/Room.js');
var config = require('./config.js');

var indexPage = path.resolve(__dirname + '../../public');
var bingtoken = process.env.TOKEN || config.accessToken;
var accessToken = encodeURIComponent(bingtoken);
var msTranslator = require('mstranslator');
var async = require('async');

app.use(express.static(indexPage));

io.on('connection', function(socket){
  socket.join('lobby');
 //console.log('a user connected!');
  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });

  var languages = ['es', 'en', 'it', 'tlh', 'zh-CHT'];

  socket.on('chat message', function(msg){
    //actually, join it here since we emit msg in here?
    if(msg.room === ""){
      msg.room = 'lobby';
    }

    var client =  new msTranslator({
      client_id:  "linguistHRR3",
      client_secret: "ucpusUg1TmtwCwva9jOCZXTtAoqhpbNaPb0fwU3plrk="
    }, true);

    async.parallel([

      function(callback){
        client.translate ({text : msg.text , from : msg.lang , to : 'en'} , function (err , data) {
          if(err){console.log(err)}
          else{
            callback (err , data);
          }
        });
      },

      function(callback){
        client.translate ({text : msg.text , from : msg.lang , to : 'es'} , function (err , data) {
          if(err){console.log(err)}
          else{
            callback (err , data);
          }
        });
      },
      function(callback){
       client.translate ({text : msg.text , from : msg.lang , to : 'it'} , function (err , data) {
          if(err){console.log(err)}
          else{
            callback (err , data);
          }
        });
      },
      function(callback){
        client.translate ({text : msg.text , from : msg.lang , to : 'tlh'} , function (err , data) {
          if(err){console.log(err)}
          else{
            callback (err , data);
          }
        });
      },
      function(callback){
        client.translate ({text : msg.text , from : msg.lang , to : 'zh-CHT'} , function (err , data) {
          if(err){console.log(err)}
          else{
            callback (err , data);
          }
        });
      }
    ], function(err, results){
      msg.translations = results;
      // console.log(results);
      socket.join(msg.room);
      console.log(msg.translations);
      // code below shows room w/users inside
      io.to(msg.room).emit('chat message', msg);
    });
  });

  socket.on('leave room', function(room){
    // console.log(socket.adapter.rooms);
    socket.leave(room);
   // console.log('leaving room ->', room);
   // console.log('elvis has left the building!');
   // console.log(socket.adapter.rooms);
  });

  socket.on('join room', function(room){
    // console.log(socket.adapter.rooms);
    socket.join(room);
   // console.log('enter room ->', room);
   // console.log(socket.adapter.rooms);
  });

});

http.listen(port, function(){
  console.log('listening on *:', port);
});