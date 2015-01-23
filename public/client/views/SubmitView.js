//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit'
  },

  handleSubmit: function(){
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    console.log('message si ->', message);  
    socket.emit('chat message', message);
    $('#chatInput').val('');
    return false;
  }
});
