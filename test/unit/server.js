
var assert = require('chai').assert;
var should = require('chai').should();
var expect =require('chai').expect;
var io = require('socket.io-client');
var Translator = require('../../server/translator.js');
var chatter = require('../../server/ChatHandler.js');


describe('server', function() {
  it('should allow a user to connect and disconnect', function(){
    var client1 = io.connect("http://localhost:3000", {
            transports: ['websocket'],
            'force new connection': true
          });
    client1.on('connect', function(){
      expect(client1.connected).to.equal(true);
      client1.disconnect();
      expect(client1.disconnected).to.equal(true);
      });
    });

    it('should send a message', function(){
      var msg = {text:'hi', lang:'en', room:'lobby', username: 'user'};
      var client1 = io.connect("http://localhost:3000", {
            transports: ['websocket'],
            'force new connection': true
          });
      console.log(msg);
      client1.emit('chat message', msg);
      client1.on('chat message', function(messsage){
        console.log(message);
        client1.disconnect();
    });
  });
});

describe('ChatHandler', function(){
  var db = require('../db.js');

  db();

  it('should join the correct room and increment language and connections', function(done){
    chatter.joinRoom('test1', 'en', function(room){
      expect(room.lang.en).to.equal(1);
      done();
    });
  });
  it('should leave the correct room and decrement language and connections', function(){
    chatter.joinRoom('test2', 'en');
    chatter.joinRoom('test2', 'es');
    chatter.leaveRoom('test2', 'en', function(room){
      expect(room.lang.en).to.equal(0);
      expect(room.lang.es).to.equal(1);
      done();
    });
  });
  // it('should return an array of prepared messages', function(){
  // });
  //it('should create a new room if room does not exist', function(){
  //
  //});
  //it('should delete rooms when they are empty', function(){
  //
  //});
});




describe('translator.js', function(){


  it('makeTranslateQuery should return a function', function(){
    var text = 'hello world';
    var fromLang = 'en';
    var toLang = 'es';
    var fn = Translator.makeTranslateQuery(text, fromLang, toLang);

    expect(fn).to.be.a('function');

  });

  it('makeTranslateQuery should receive back correct translation', function(done){
    var text = 'hello world';
    var fromLang = 'en';
    var toLang = 'es';
    var fn = Translator.makeTranslateQuery(text, fromLang, toLang);

  // console.log(fn);
    function getData(err, data){

      expect(data).to.equal("Hola mundo");

      done();
    }
     var resultData = fn(getData);

  });

});