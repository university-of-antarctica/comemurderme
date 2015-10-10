var express = require('express'),
    app = express(),
    path = require('path'),
    async = require('async'),
    DB = require('./db.js'),
    db = new DB();
    // imgur = require('imgur');





var _port = 8289;
var _root_dir = "../"


// Local Murdlet Operations ///////////////////////////////

var CreateMurdlet = function(fid,uuid,time,comment){
  var murdlet = {
    fid:fid,
    uuid:uuid,
    time: time,
    comment: comment
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
  user.murdlets.push(uuid);
}

var CreateUser = function(){
  user = {
    murdlets:[]
  }
  return user;
}



// Hosting API for murdlets /////////////////////////////


var HostListMurdlets = function(fid){
  app.get("/list",function(req,res){
    var fid = req.query.fid;
    ListMurdlets(fid,function(err,murdlets){
      res.end(JSON.stringify(murdlets));
    });
  })
}

var HostSubmitMurdlet = function(){
   app.get("/submit",function(req,res){
     var fid = req.query.fid;
     var uuid = req.query.uuid;
     var time = req.query.time;
     var comment = req.query.comment;
     var murdlet = CreateMurdlet(fid,uuid,time,comment);
     SubmitMurdlet(murdlet);
     res.end("murdlet submitted");
  });
}


//////////////////////////////////////////////////////////////////







// Page Hosting ///////////////////////////////////////////////////


var Listen = function(){
  app.listen(_port, function() {
    console.log('Listening on port '+ _port);
  });
}

var HostIndex = function(){
  app.get("/",function(req,res){
    var url = path.join(__dirname, _root_dir, "index.html")
    res.sendFile(url);
  });
}

var HostBundle = function(){
   app.get("/bundle.js",function(req,res){
    var url = path.join(__dirname, _root_dir,"build/bundle.js")
    res.sendFile(url);
  });
}


Listen();
HostIndex();
HostBundle();
HostSubmitMurdlet();
HostListMurdlets();