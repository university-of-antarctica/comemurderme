var db = function(){
  var redis = require('redis');
  var _client = {}; 


  // Setup Redis //////////////////////////////////////////////

  var SetupRedis = function(){
    _client = redis.createClient();
    _client.on("connect", function(){
      console.log("connected to redis");
    });
  }

  var RedisStoreCheck = function(key, value){
    return function(err, reply){
      if(err || reply!=='OK'){
        console.error("problem setting" + key + " to " + value + ".");
      }
    }
  }

  var RedisLoadCheck = function(key, callback){
    return function(err,reply){
      if(err){
        console.error("trouble loading " + key);
      }
      callback(err,JSON.parse(reply));
    }
  }

  var Store = function(key, value){
    _client.set(JSON.stringify(key),JSON.stringify(value), RedisStoreCheck(key,value));
  }
  var Load = function(key, callback){
    _client.get(JSON.stringify(key),RedisLoadCheck(key, callback));
  }
  
  SetupRedis();

  this.Store = Store;
  this.Load = Load;
}
module.exports = db;