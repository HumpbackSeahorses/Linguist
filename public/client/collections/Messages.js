var Messages = Backbone.Collection.extend({

  model: Message,

  //instantiate new model
  //add model to collection
  addmsg: function(msg){
    console.log(msg);
    var message = new Message({ username: msg.username,
                                  text: msg.text, 
                                  lang: msg.lang, 
                                  room: msg.room,
                                  translations: msg.translations
                                });
    this.add(message);
  }

});