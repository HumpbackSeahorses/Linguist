var port = process.env.PORT || 3000;

var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');

var db = require('../db/db.js');
var Rooms = require('../db/models/Room.js');
var config = require('./config.js') || {};

var indexPage = path.resolve(__dirname + '../../public');

var translator = require('./translator.js');

app.use(express.static(indexPage));

io.on('connection', function(socket){
  //automatically connect new users to lobby
  socket.join('lobby');
  //console.log('a user connected!');
  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    if(msg.room ===''){
      msg.room = 'lobby';
    }
    Rooms.findOne({room: msg.room}, function(err, room){
      if (err){
        console.log(err, ' error finding room!');
      }
      translator.translate(msg, room, function(err, results){
        msg.translations = results;
        socket.join(msg.room);
        console.log('broadcasted message: ', msg);
        io.to(msg.room).emit('chat message', msg);
      });
    })
  });

  socket.on('leave room', function(room){
    // console.log(socket.adapter.rooms);
    socket.leave(room);
    // console.log('leaving room ->', room);
    // console.log('elvis has left the building!');
    // console.log(socket.adapter.rooms);
  });

  socket.on('join room', function(new_room, client_language){
    socket.join(new_room);
    // Find room in db
    Rooms.findOne({room: new_room}, function(err, room){
      if(err){
        console.log(err, 'error finding room!');
      }
      // this creates room if it doesn't exist,
      // stores languages as lang obj, property = language code
      // value = # of users connected that langauge
      if(room === null){
        var lang = {};
        lang[client_language] = 1;
        room = new Rooms({
          room: msg.room,
          lang: lang
        }) 
      } else {
        // If language exists in room, add 1 to user counter, else initiate to 1
        room.lang[client_language] = (room.lang[client_language]) ? room.lang[client_language] + 1 : 1;
      }
      room.save();
    });
    // console.log(socket.adapter.rooms);
    // console.log('enter room ->', room);
    // console.log(socket.adapter.rooms);
  });

});

http.listen(port, function(){
  console.log('listening on *:', port);
});