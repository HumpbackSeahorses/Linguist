var port = process.env.PORT || 3000;
var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');

var indexPage = path.resolve(__dirname + '../../public');

app.use(express.static(indexPage));

var chatter = require('./server/ChatHandler.js');

io.on('connection', function(socket){
  //automatically connect new users to lobby
  socket.join('lobby');
  //join lobby in db, default to en for now
  chatter.joinRoom('lobby', 'en');

  //naive solution, custom variables to store last room
  //and user language. used tidying rooms on disconnect
  //if users are implemented these should probably be in that model
  socket.currentRoom = 'lobby';
  socket.userLang = 'en';

  socket.on('disconnect', function(){
    //console.log('user disconnected');
    chatter.leaveRoom(socket.currentRoom, socket.userLang)
  });

  socket.on('chat message', function(msg){
    //translate and emit results with callback on prepared message
    chatter.prepareMessage(msg, function(){
      socket.join(msg.room);
      console.log('broadcasted message: ', msg);
      io.to(msg.room).emit('chat message', msg);
    })
  });

  socket.on('leave room', function(data){
    // console.log(socket.adapter.rooms);
    socket.leave(data.leaveRoom);
    //leave room
    chatter.leaveRoom(data.leaveRoom, data.lang);
  });

  socket.on('join room', function(data){
    socket.join(data.joinRoom);
    //join room
    socket.currentRoom = data.joinRoom;
    chatter.joinRoom(data.joinRoom, data.lang);
    // console.log(socket.adapter.rooms);
    // console.log('enter room ->', room);
    // console.log(socket.adapter.rooms);
  });

  socket.on('change language', function(data){

  });

});

http.listen(port, function(){
  console.log('listening on *:', port);
});