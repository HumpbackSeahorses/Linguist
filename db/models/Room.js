var mongoose = require('mongoose');
var Room = mongoose.Schema({
  room: String,
  lang:[]
});

module.exports = mongoose.model('Rooms', Room);