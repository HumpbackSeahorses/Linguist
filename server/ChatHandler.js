var db = require('../db/db.js');
var Rooms = require('../db/models/Room.js');
var translator = require('./translator.js');

var ChatHandler = function(){};

//translate/emit message
ChatHandler.prototype.prepareMessage = function(msg, callback){
  if(msg.room ===''){
    msg.room = 'lobby';
  }
  Rooms.findOne({room: msg.room}, function(err, room){
    if (err){
      console.log(err, ' error finding room!');
    }
    translator.translate(msg, room, function(err, results){
      if(err){
        console.log('error translating: ', err);
      }
      msg.translations = results;
      callback(msg);
    });
  });
}

//join room
ChatHandler.prototype.joinRoom = function(joinRoom, lang){
  Rooms.findOne({room: joinRoom}, function(err, room){
    if(err){
      console.log(err, 'error finding room!');
    }
    // this creates room if it doesn't exist,
    // stores languages as lang obj, property = language code
    // value = # of users connected that langauge
    if(room === null){
      var language = {};
      language[lang] = 1;
      room = new Rooms({
        room: joinRoom,
        lang: language,
        connections: 1
      }) 
    } else {
      // If language exists in room, add 1 to user counter, else initiate to 1
      room.lang[lang] = (room.lang[lang] > 0) ? room.lang[lang] + 1 : 1;
      room.markModified('lang');
      room.connections++;
    }
    console.log('joined room: ', joinRoom);
    room.save();
  });
}

ChatHandler.prototype.leaveRoom = function(leaveRoom, lang){
  Rooms.findOne({room: leaveRoom}, function(err, room){
    if(err){
      console.log('FATAL: error finding room to leave!');
    }
    room.connections--;
    if(room.connections === 0){
      //delete room if no users left:
      room.remove();
    } else {
      room.lang[lang]--;
      room.markModified('lang');
      room.save();
    }
    console.log('left room: ', leaveRoom);
  });
  // console.log('leaving room ->', room);
  // console.log('elvis has left the building!');
  // console.log(socket.adapter.rooms);
}

module.exports = new ChatHandler();
