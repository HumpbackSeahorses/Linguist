var Roomview = Backbone.View.extend({

  events: {
    'change #room' : 'changeRoom'
  },

  initialize : function(){
    var currentRoom = 'lobby';  
  },

  changeRoom : function(){
    socket.emit('leave room', currentRoom);
    currentRoom = $('#room').val();
    socket.emit('join room', currentRoom);
  }

});
