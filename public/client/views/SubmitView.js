//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit',
    'change #lang' : 'changeLanguage'
  },

  initialize: function(){
    this.prevRoom = 'lobby';
  },

  handleSubmit: function(){
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    this.checkRoom(message);
    console.log('message is ->', message);
    socket.emit('chat message', message);
    $('#chatInput').val('');
    return false;
  },

  changeLanguage: function(){
    console.log('changing language');
    socket.emit('change language', $('#lang').val());
  },

  checkRoom : function(msg){
    if(msg.room !== this.prevRoom){
      this.changeRoom(msg, callback);
    }
  },

  changeRoom : function(msg){
    socket.emit('leave room', {leaveRoom: this.prevRoom, lang: msg.lang});
    this.prevRoom = msg.room;
    socket.emit('join room', {joinRoom: msg.room, lang: msg.lang});
  }
});
