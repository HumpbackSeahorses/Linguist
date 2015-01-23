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