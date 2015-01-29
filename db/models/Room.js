var mongoose = require('mongoose');

// Each room stores the total connections in the connections property, 
// and which languages are connected in the lang property object.
// eg: Room = {lobby, 4, { en: 3, es: 1 }} = 4 users connected to lobby, 3 english 1 spanish

var Room = mongoose.Schema({
  room: String,
  connections: {type: Number, default: 0}, 
  lang:{}
});

module.exports = mongoose.model('Rooms', Room);