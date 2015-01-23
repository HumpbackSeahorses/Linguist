var socket = io();

//setup backbone message model
var Message = Backbone.Model.extend({
  defaults:{
    username:'',
    text: '',
    roomname:'',
    lang: 'en'
  }
});

var Messages = Backbone.Collection.extend({

  model: Message,

  //instantiate new model
  //add model to collection
  addmsg: function(msg){
    var something = new Message({text: msg});
    this.add(something);
  }

  //TODO: ajax post to translate server
  // translate: function(){}

});

//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit'
  },

  handleSubmit: function(){
    //emits message to server via socket.io
    socket.emit('chat message', $('#chatInput').val());
    //reset input field
    $('#chatInput').val('');
    return false;
  }

});

var MessageView = Backbone.View.extend({
  template : _.template('<div> <%- text %></div>'),

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({

  initialize : function(){
    var collect = this.collection;
    this.collection.on('add', this.render, this);

    //socket.io listener for emits
    socket.on('chat message', function(msg){
      //adds message to collection
      collect.addmsg(msg);
    });

    //storage variable for
    this.onscreenMessages = {};
  },

  render : function () {
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage : function(message) {
    //message.cid is unique client-only id
    if (!this.onscreenMessages[message.cid]) {
      var messageView = new MessageView ({model : message});
      this.$el.prepend (messageView.render());
      this.onscreenMessages[message.cid] = true;
    }
  }

});

//initialize
$(function(){
  var messages = new Messages();
  var submitView = new SubmitView({el: $('#submitView'), collection: messages});
  var messagesView = new MessagesView({el: $('#messagesView'), collection: messages});
});
