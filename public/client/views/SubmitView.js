//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit',
    'change #lang' : 'changeLanguage',
    'click #roomButton' : 'changeRoom'
  },

  initialize: function(){
    // this.prevRoom = 'lobby';
  },

  handleSubmit: function(){
    console.log('submitting!');
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    socket.emit('chat message', message);
    console.log('message is ->', message);
    $('#chatInput').val('');
    return false;
  },

  changeLanguage: function(){
    console.log('changing language');
    socket.emit('change language', $('#lang').val());
    return false;
  },

  changeRoom : function(){
    console.log('helooahweofhowehfoiha;ioweaowegasdhg;salhgk');
    var room = $('#room').val();
    var lang = $('#lang').val();
    // this.prevRoom = room;
    console.log(lang);
    socket.emit('join room', {room: room, lang: lang});
    return false;
  }
});
