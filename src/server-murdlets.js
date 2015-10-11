var server_murdlets = function(){
  var DB = require("./db.js"),
    db = new DB(),
    async = require('async');

  // Local Murdlet Operations ///////////////////////////////

  var CreateMurdlet = function(fid,uuid,time,comment, image_url, latlng){
    var murdlet = {
      fid:fid,
      uuid:uuid,
      time: time,
      comment: comment,
      image_url: image_url,
      latlng: latlng
    };
    return murdlet;
  }

  var SubmitMurdlet = function(murdlet){
    var fid = murdlet.fid;
    // db.Store the murdlet
    db.Store(murdlet.uuid, murdlet);
    db.Load(fid,function(err, reply){
      console.log("reply: " +reply)
      var user = reply;
      if(!user){
        console.log("creating user");
        user = CreateUser();
      }
      console.log("user: ");
      console.log(user);
      AddMurdletToUser(user,murdlet.uuid);
      db.Store(fid,user);
    });
  }

  var ListMurdlets = function(fid,callback){
    console.log("loading for fid " + fid);
    db.Load(fid,function(err,reply){
      
      var user = reply;
      console.log("user: ");
      console.log(user);
      if(!user){
        callback(null,[]);
        return;
      }
      var uuids = user.murdlets;
      var murdlets = [];
      console.log("uuids: " + uuids);
      async.forEachOf(
        uuids,
        function(uuid,key,async_cb){
          console.log("uuid: " + uuid);
          db.Load(uuid,function(err,reply){
            console.log("reply: " + reply);
            murdlets[key] = reply;
            async_cb();
          })
        },
        function(err){
          if(err) console.error(" problem db.Loading murdlets to list them");
          console.log(murdlets);
          callback(null,murdlets);
        }
      );
    });
  }

  // Boring Local Murdlet stuff //////////////////////////////////

  var AddMurdletToUser = function(user,uuid){
    if(user.murdlets.indexOf(uuid) >= 0){
      console.error("user already had a murdlet with this UUID");
    }
    user.murdlets.push(uuid);
  }

  var CreateUser = function(){
    user = {
      murdlets:[]
    }
    return user;
  }

  this.ListMurdlets = ListMurdlets;
  this.SubmitMurdlet = SubmitMurdlet;
  this.CreateMurdlet = CreateMurdlet;



}
module.exports = server_murdlets;