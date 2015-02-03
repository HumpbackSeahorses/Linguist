var assert = require('chai').assert;
var should = require('chai').should();
var expect =require('chai').expect;
var Translator = require('../../server/translator.js');
var sinon = require('sinon');


describe('translate api', function(){
 var spy = null;
 var spy = null;

  beforeEach(function(){
    spy = sinon.spy(Translator, 'makeTranslateQuery');
  });

  afterEach(function(){
    spy.restore();

  });

  it('should make a call to makeTranslateQuery for each language', function(done){

    var message = {text:"hello", lang:'en'};
    var room = {lang:{en:1, es:2, it:1}};
    var cb  = function(){
      expect(Translator.makeTranslateQuery.calledThrice).to.equal(true);
      done();
    };
    Translator.translate(message, room, cb);

  });

  it('should only make translate requests for languages in that room', function(done){

    var message = {text: 'hello world', fromLang: 'en', toLang: 'es'};
    var room = {lang: {en:1, es:2, it:1}};
    var callback= function(err, data){
      expect(data['tlh']).to.be.undefined;
      done();
    };

    Translator.translate(message, room, callback);

  });

});
