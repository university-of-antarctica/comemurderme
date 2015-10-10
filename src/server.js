var express = require('express'),
    app = express(),
    path = require('path');




var _port = 8289;
var _root_dir = "../"

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