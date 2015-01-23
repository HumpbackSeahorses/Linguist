var Messages = Backbone.Collection.extend({

  model: Message,

  //instantiate new model
  //add model to collection
  addmsg: function(msg){
    var something = new Message({ username: msg.username, 
                                  text: msg.text, 
                                  lang: msg.lang, 
                                  room: msg.room
                                });
    this.add(something);
  }

  //TODO: ajax post to translate server
  // translate: function(){}

});