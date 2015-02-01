var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
//var translator = require('../../server/translator.js');
var translator = new Translator();


describe('server', function() {

  before(function () {
    socketJoinStub = sinon.stub(socket, "join");
  });

  after(function () {
    socketJoinStub.restore();
  });

  it('should call socket.join when a user connects', function(){
    expect(socketJoinStub.called).to.equal(true);
  });

  it('should call chatter.joinRoom when a user connects', function(){
    expect(true).to.equal(false);
  });

  it('should call chatter.leaveRoom when a user disconnects', function(){
    expect(true).to.equal(false);
  });

  it('should call chatter.prepareMessage when a message is received', function(){
    expect(true).to.equal(false);
  });

  it('should leave the current room when joining a new room', function(){
    expect(true).to.equal(false);
  });

  it('should update rooms database when joining a new room', function(){
    expect(true).to.equal(false);
  });

  it('should call chatter.changeLanguage when updating the user language', function(){
    expect(true).to.equal(false);
  });
});



describe('ChatHandler', function(){

  it('should increment input language in room', function(){

  });
  it('should decrement input language in room', function(){

  });
  it('should return an array of prepared messages', function(){

  });
  it('should create a new room if room does not exist', function(){

  });
  it('should delete rooms when they are empty', function(){

  });
});




describe('translator.js', function(){

  it('should make a translate obj', function(){
    var text = 'hello world';
    var fromLang = 'en';
    var toLang = 'es';
    var fn = translator.translate(text, fromLang, toLang);

    var result = todo.util.trimTodoName(whiteSpace);
    
    function getData(err, data){
      var inside;
      inside = data;
      return inside;
    }
     var resultData = result(getData);
    
    expect(resultData.text).to.eqaul(text);
    expect(resultData.from).to.eqaul(fromLang);
    expect(resultData.to).to.eqaul(toLang);


  });

  it('should make a make a translate request', function(){
    
    
  });

  it('should recieve back correct translation', function(){
    
    
  });

  it('should make a call to makeTranslateQuery for each language', function(){


  });

  it('should only make tranlste requests for languages in that room', function(){


  })
});