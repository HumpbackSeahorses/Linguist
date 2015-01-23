//setup backbone message model
var Message = Backbone.Model.extend({
  defaults:{
    username:'',
    text: '',
    roomname:'',
    lang: 'en'
  }
});
