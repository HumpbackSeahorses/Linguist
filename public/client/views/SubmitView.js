//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit',
  },

  initialize: function(){
    this.prevRoom = 'lobby';
  },

  handleSubmit: function(){
    console.log('submitting!');
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    if(this.isNewRoom(message.room)){
      this.changeRoom(message);
    } else {
      socket.emit('chat message', message);
    }
    console.log('message is ->', message);
    $('#chatInput').val('');
    return false;
  },

  isNewRoom : function(room){
    if(room !== this.prevRoom){
      return true;
    }
    return false;
  },

  changeRoom : function(msg){
    // socket.emit('leave room', {leaveRoom: this.prevRoom, lang: msg.lang});
    this.prevRoom = msg.room;
    socket.emit('join room', msg);
  }
});
