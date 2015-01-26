//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit'
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

  checkRoom : function(msg){
    if(msg.room !== this.prevRoom){
      this.changeRoom(msg);
    }
  },

  changeRoom : function(msg){
    socket.emit('leave room', this.prevRoom);
    this.prevRoom = msg.room;
    socket.emit('join room', msg.room);
  }
});
