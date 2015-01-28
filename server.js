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

  socket.on('disconnect', function(){
    //console.log('user disconnected');
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
    chatter.joinRoom(data.joinRoom, data.lang);
    // console.log(socket.adapter.rooms);
    // console.log('enter room ->', room);
    // console.log(socket.adapter.rooms);
  });

  socket.on('change room', function(data){

  });

});

http.listen(port, function(){
  console.log('listening on *:', port);
});