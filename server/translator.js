var msTranslator = require('mstranslator');
var config = require('./config.js')

var makeTranslateQuery = function(text, fromLang, toLang){
  var params = {
    text: text,
    from: fromLang,
    to: toLang
  }
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
}

module.exports = makeTranslateQuery;