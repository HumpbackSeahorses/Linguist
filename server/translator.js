var msTranslator = require('mstranslator');
var config = require('./config.js');
var async = require('async');


var Translator = function(){};

Translator.prototype.translate = function(msg, room, callback){
  var tasks = [];
  for(var i = 0; i < room.lang.length; i++){
    console.log(room.lang[i], ' from translate function');
    tasks[i] = this.makeTranslateQuery(msg.text, msg.lang, room.lang[i]);
  }
  async.parallel(tasks, function(err, results){
    callback(err, results);
  })
};

Translator.prototype.makeTranslateQuery = function(text, fromLang, toLang){
  var params = {
    text: text,
    from: fromLang,
    to: toLang
  };
  return function(callback){
    var client =  new msTranslator({
      client_id:  config.client_id,
      client_secret: config.client_secret
    }, true);
    client.translate (params, function (err , data) {
      console.log (params.to, 'returned data');
      if(err){
        console.log(err)
      }
      else{
        var arrData = [data , params.to];
        callback (err , arrData);
      }
    });
  };
};

module.exports = new Translator();