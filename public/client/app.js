//initialize
var socket = io();
$(function(){
  var messages = new Messages();
  var submitView = new SubmitView({el: $('#submitView'), collection: messages});
  var messagesView = new MessagesView({el: $('#messagesView'), collection: messages});

  $('#room').change(function(){
    socket.emit('leave room', currentRoom);
    currentRoom = $('#room').val();
    socket.emit('join room', currentRoom);
  });
  var currentRoom = 'lobby';
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg.username + '@' + msg.room + ' - ' + msg.text));
  });

});