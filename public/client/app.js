var message = Backbone.Model.extend({

  defaults:{
    username:'',
    text: '',
    roomname:'',
    lang: 'en'
  }
});

var messages = Backbone.Collection.extend({

  model: message,

  //ajax get to our server
  getMsg: function(){},

  //ajax post to our server
  postMsg: function(){

  }

  //ajax post to translate server
  // translate: function(){}

});

var submitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit'
  },

  initialize: function(){

  },

  handleSubmit: function(){

  }

});

var messageView = Backbone.View.extend({
  template : _.template('<div><%- username %></div>\
                         <div> <%- text %></div>\
                         <div><%= lang %></div>'),

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

var messagesView = Backbone.View.extend({
  initialize : function(){
    this.collection.on('sync', this.render, this);
    // this.collection.on('change:translate', this.render, this)
  },
  render : function(){

  }

});