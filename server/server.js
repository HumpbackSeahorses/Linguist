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
  // Find room in db
  Rooms.findOne({room: 'lobby'}, function(err, room){
    if(err){
      console.log(err, 'error finding room!');
    }
    // this creates room if it doesn't exist,
    // stores languages as lang obj, property = language code
    // value = # of users connected that langauge
    if(room === null){
      room = new Rooms({
        room: 'lobby',
        lang: {en: 1},
        connections: 1
      }) 
    } else {
      console.log('room already exists!');
      // If language exists in room, add 1 to user counter, else initiate to 1
      room.lang.en = (room.lang.en === 0) ? 1 : room.lang.en + 1;
      room.markModified('lang');
      room.connections++;
    }
    console.log('joined room: ', 'lobby');
    room.save();
  });
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

  socket.on('leave room', function(data){
    // console.log(socket.adapter.rooms);
    socket.leave(data.leaveRoom);

    Rooms.findOne({room: data.leaveRoom}, function(err, room){
      if(err){
        console.log('error finding room!');
      }
      room.lang[data.lang]--;
      room.connections--;
      if(room.connections === 0){
        //delete room if no users left:
        room.remove();
      } else {
        room.save();
      }
      console.log('left room: ', data.leaveRoom);
    });
    // console.log('leaving room ->', room);
    // console.log('elvis has left the building!');
    // console.log(socket.adapter.rooms);
  });

  socket.on('join room', function(data){
    socket.join(data.joinRoom);
    // Find room in db
    Rooms.findOne({room: data.joinRoom}, function(err, room){
      if(err){
        console.log(err, 'error finding room!');
      }
      // this creates room if it doesn't exist,
      // stores languages as lang obj, property = language code
      // value = # of users connected that langauge
      if(room === null){
        var lang = {};
        lang[data.lang] = 1;
        room = new Rooms({
          room: data.joinRoom,
          lang: lang,
          connections: 1
        }) 
      } else {
        // If language exists in room, add 1 to user counter, else initiate to 1
        room.lang[data.lang] = (room.lang[data.lang] > 0) ? room.lang[data.lang] + 1 : 1;
        room.markModified('lang');
        room.connections++;
      }
      console.log('joined room: ', data.joinRoom);
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