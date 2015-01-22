//Server
var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var path = require('path');

var indexPage = path.resolve(__dirname + '../../public/index.html');

console.log(indexPage);

app.get('/*', function(req, res){
  res.sendFile(indexPage);
});

io.on('connection', function(socket){
  console.log('a user connected!');
});

module.exports = app;