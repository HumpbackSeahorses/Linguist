var msTranslator = require('mstranslator');

var makeTranslateQuery = function(text, fromLang, toLang){
  var params = {
    text: text,
    from: fromLang,
    to: toLang
  }
  return function(callback){
    var client =  new msTranslator({
      client_id:  "linguistHRR3",
      client_secret: "ucpusUg1TmtwCwva9jOCZXTtAoqhpbNaPb0fwU3plrk="
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