//returns rendered template
var MessageView = Backbone.View.extend({
  template : _.template('<div class="message-display"> \
                          <span> \
                            <strong><%- username %></strong>@<%- room %> - <%- text %> \
                          </span> \
                        </div>'
                        ),

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({

  initialize : function(){
    var collection = this.collection;
    this.collection.on('add', this.render, this);

    //socket.io listener for emits
    socket.on('chat message', function(msg){
      //adds message to collection
      var userLang = $('#lang').val();
      msg.text = msg.translations[userLang];
      collection.addmsg(msg);
    });

    //storage variable for displayed messages
    this.onscreenMessages = {};
  },

  render : function () {
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage : function(message) {
    //message.cid is unique client-only id
    if (!this.onscreenMessages[message.cid]) {
      var messageView = new MessageView ({model : message});
      this.$el.append (messageView.render());
      this.onscreenMessages[message.cid] = true;
    }
  }

});