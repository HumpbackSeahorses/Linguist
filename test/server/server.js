
var assert = require('chai').assert;
var should = require('chai').should();
var expect =require('chai').expect;
var socketio = require('socket.io');
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

    it('should emit a message sent from the client', function(){
      var msg = {text:'hi', lang:'en', room:'lobby', username: 'user'};
      var socket = socketio();
      var client1 = io.connect("http://localhost:3000", {
            transports: ['websocket'],
            'force new connection': true
          });
      socket.emit('chat message', msg);
      socket.on('chat message', function(messsage){
        console.log("message => ", message);
        expect(message).to.equal(msg);
        client1.disconnect();
    });
  });
});

// These tests are broken. Issues with mongoose connection.
// When they are run the tests all pass but they may be false positives.

// describe('ChatHandler', function(){
//   var mongoose = require('mongoose');

//   mongoose.connect('mongodb://localhost:27017/test');
//   var connection = mongoose.connection;

//   before(function(done) {
//     connection.on('open', function() {
//       connection.db.dropDatabase(done);
//     });
//   });
//   after(function(done) {
//     connection.close(done);
//   });

//   afterEach(function(done) {
//     connection.db.dropDatabase(done);
//   });

//   it('should join the correct room and increment language and connections', function(done){
//     chatter.joinRoom('test1', 'en', function(room){
//       expect(room.lang.en).to.equal(1);
//       done();
//     });
//   });

//   it('should leave the correct room and decrement language and connections', function(){
//     chatter.joinRoom('test2', 'en', function(){
//       chatter.joinRoom('test2', 'es', function(){
//         chatter.leaveRoom('test2', 'en', function(room){
//           expect(room.lang.en).to.equal(0);
//           expect(room.lang.es).to.equal(1);
//           done();
//         });
//       });
//     });
//   });
//   it('should return an array of prepared messages', function(){
//   });
//   it('should create a new room if room does not exist', function(){

//   });
//   it('should delete rooms when they are empty', function(){
//     chatter.joinRoom('test6', 'en');
//     chatter.leaveRoom('test6', 'en', function(room){
//       expect(room).to.equal(null);
//     });
//   });
// });


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