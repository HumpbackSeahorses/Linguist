var port = process.env.PORT || 3000;

var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');

var indexPage = path.resolve(__dirname + '../../public/index.html');

console.log(indexPage);

app.get('/', function(req, res){
  res.sendFile(indexPage);
});

io.on('connection', function(socket){
  console.log('a user connected!');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on *:', port);
});