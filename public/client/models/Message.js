//setup backbone message model
var Message = Backbone.Model.extend({
  defaults:{
    username:'',
    text: '',
    room:'',
    lang: 'en'
  }
});
