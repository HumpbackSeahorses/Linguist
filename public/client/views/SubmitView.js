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

  handleSubmit: function(e){
    e.preventDefault();
    console.log('submitting!');
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    // if(this.isNewRoom(message.room)){
    //   this.changeRoom(message);
    // } else {
    // socket.emit('chat message', message);
    // }
    socket.emit('chat message', message);
    console.log('message is ->', message);
    $('#chatInput').val('');
    return false;
  },

  changeLanguage: function(e){
    e.preventDefault();
    console.log('changing language');
    socket.emit('change language', $('#lang').val());
  },

  // isNewRoom : function(room){
  //   if(room !== this.prevRoom){
  //     return true;
  //   }
  //   return false;
  // },

  changeRoom : function(e){
    // socket.emit('leave room', {leaveRoom: this.prevRoom, lang: msg.lang});
    e.preventDefault();
    console.log('helooahweofhowehfoiha;ioweaowegasdhg;salhgk');
    var room = $('#room').val();
    var lang = $('#lang').val();
    // this.prevRoom = room;
    console.log(lang);
    socket.emit('join room', {room: room, lang: lang});
  }
});
