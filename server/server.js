var port = process.env.PORT || 3000;

var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');

var indexPage = path.resolve(__dirname + '../../public');

app.use(express.static(indexPage));

io.on('connection', function(socket){
  socket.join('lobby');
  console.log('a user connected!');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    //actually, join it here since we emit msg in here?
    msg.room = msg.room || 'lobby';
    socket.join(msg.room);
    // code below shows room w/users inside
    // console.log(socket.adapter.rooms);
    io.to(msg.room).emit('chat message', msg);
    // console.log('username: ' + msg.username);
    // console.log('message: ' + msg.text);
    // console.log('language: ' + msg.lang);
    // console.log('room: ' + msg.room);
  });

  socket.on('leave room', function(room){
    // console.log(socket.adapter.rooms);
    socket.leave(room);
    console.log('leaving room ->', room);
    console.log('elvis has left the building!');
    console.log(socket.adapter.rooms);
  });

  socket.on('join room', function(room){
    // console.log(socket.adapter.rooms);
    socket.join(room);
    console.log('enter room ->', room);
    console.log(socket.adapter.rooms);
  });

});

http.listen(port, function(){
  console.log('listening on *:', port);
});