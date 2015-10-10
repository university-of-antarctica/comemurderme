var express = require('express'),
    app = express(),
    path = require('path'),
    Murdlets = require('./murdlet.js'),
    murdlets = new Murdlets();
    // imgur = require('imgur');





var _port = 8289;
var _root_dir = "../"



// Hosting API for murdlets /////////////////////////////


var HostListMurdlets = function(fid){
  app.get("/list",function(req,res){
    var fid = req.query.fid;
    murdlets.ListMurdlets(fid,function(err,murdlets){
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
     var murdlet = murdlets.CreateMurdlet(fid,uuid,time,comment);
     murdlets.SubmitMurdlet(murdlet);
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