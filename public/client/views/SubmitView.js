//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit',
    'change #lang' : 'changeLanguage',
    'click #roomButton' : 'changeRoom'
  },

  initialize: function(){},

  handleSubmit: function(e){
    e.preventDefault();
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    socket.emit('chat message', message);
    //remove for production
    console.log('Submitting message ->', message);
    $('#chatInput').val('');
  },

  changeLanguage: function(e){
    e.preventDefault();
    console.log('changing language');
    socket.emit('change language', $('#lang').val());
  },

  changeRoom : function(e){
    e.preventDefault();
    var room = $('#room').val();
    var lang = $('#lang').val();
    socket.emit('join room', {room: room, lang: lang});
  }
});
