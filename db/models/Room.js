var mongoose = require('mongoose');
var Room = mongoose.Schema({
  room: String,
  lang:{},
  connections: {type: Number, default: 0} 
});

module.exports = mongoose.model('Rooms', Room);