var port = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');
var db = require('./db/db.js');

var indexPage = path.resolve(__dirname + '/public');

app.use(express.static(indexPage));

var chatter = require('./server/ChatHandler.js');

io.on('connection', function(socket){
  //automatically connect new users to lobby
  // console.log('user connected');
  socket.join('lobby');
  //join lobby in db, default to english for now
  chatter.joinRoom('lobby', 'en');

  // naive solution, custom variables to store last room and user language. 
  // They are used in socket.on 'join room' and 'change language' below.
  socket.currentRoom = 'lobby';
  socket.userLang = 'en';

  socket.on('disconnect', function(){
    // console.log('user disconnected');
    console.log(socket.currentRoom, socket.userLang);
    chatter.leaveRoom(socket.currentRoom, socket.userLang);
  });

  //translate and emit results using a callback on prepared messages
  socket.on('chat message', function(msg){
    chatter.prepareMessage(msg, function(){
      //emit message
      socket.join(msg.room);
      console.log('broadcasted message: ', msg);
      io.to(msg.room).emit('chat message', msg);
    });
  });

  socket.on('join room', function(data){
    //leave room and update rooms database
    socket.leave(socket.currentRoom);
    chatter.leaveRoom(socket.currentRoom, data.lang);

    //update currentRoom, used by chatter.leaveRoom
    socket.currentRoom = data.room;

    //join new room and update rooms database
    socket.join(data.room);
    chatter.joinRoom(data.room, data.lang);
  });

  socket.on('change language', function(newLang){
    chatter.changeLanguage(socket.userLang, newLang, socket.currentRoom);
    socket.userLang = newLang;
  });

});

http.listen(port, function(){
  console.log('listening on *:', port);
});