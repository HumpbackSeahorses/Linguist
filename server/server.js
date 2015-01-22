var port = process.env.PORT || 3000;

var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');


var indexPage = path.resolve(__dirname + '../../public');

console.log(indexPage);

app.use(express.static(indexPage));

// app.get('/', function(req, res){
//   res.sendFile(indexPage);
// });

io.on('connection', function(socket){
  console.log('a user connected!');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:', port);
});