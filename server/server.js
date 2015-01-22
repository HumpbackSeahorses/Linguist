//Server
var express = require("express");
var server = express();

server.use(express.static(__dirname + '../../public'));

server.get('/*', function(req, res){
  res.redirect('index.html');
});

module.exports = server;