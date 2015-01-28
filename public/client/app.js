//initialize
var socket = io();
$(function(){

  var messages = new Messages();
  var submitView = new SubmitView({el: $('.submitView'), collection: messages});
  var messagesView = new MessagesView({el: $('#messagesView'), collection: messages});
});