var express = require('express'),
    app = express(),
    path = require('path'),
    Murdlets = require('./server-murdlets.js'),
    server_murdlets = new Murdlets(),
    imgur = require('imgur'),
    bodyParser = require('body-parser'),
    busboy = require('connect-busboy'),
    multiparty = require('connect-multiparty');

    app.use(busboy());

var _port = 8289;
var _root_dir = "../"

var UploadImage = function(base64){
  imgur.uploadBase64(base64)
    .then(function(json){
      console.log(json.data.link);
    })
    .catch(function(err){
      console.error(err.message);
    });
}

var TestImageUpload = function(){
  var b64 = "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";
  UploadImage(b64);
}



// Hosting API for murdlets /////////////////////////////


var HostListMurdlets = function(){
  app.get("/list",function(req,res){
    var fid = req.query.fid;
    // var fid = "1276098570";
    console.log("server got fid " + fid);
    server_murdlets.ListMurdlets(fid,function(err,murdlets){
      // var html = GenerateHTML(murdlets);
      res.end(JSON.stringify(murdlets));
    });
  })
}

var HostCarousel = function(){
   app.get("/carousel",function(req,res){
    var url = path.join(__dirname, _root_dir,"index.html")
    res.sendFile(url);
  })
}

var HostUI = function(){
  app.get("/ui",function(req,res){
    // server_murdlets.ListMurdlets(fid,function(err,murdlets){
    //   var html = GenerateHTML(murdlets);
    //   res.end(html);
    // });
    var url = path.join(__dirname, _root_dir,"index.html")

    res.sendFile(url);
  })
}

var HostSubmitMurdlet = function(){
   app.get("/submit",function(req,res){
     var fid = req.query.fid;
     var uuid = req.query.uuid;
     var time = req.query.time;
     var comment = req.query.comment;
     var image_url = req.query.image_url;
     var latlng = req.query.latlng;
     var murdlet = server_murdlets.CreateMurdlet(fid,uuid,time,comment,image_url,latlng);
     server_murdlets.SubmitMurdlet(murdlet);
     res.end("murdlet submitted");
  });
}


//////////////////////////////////////////////////////////////////

// hacky (hackathon!)
var GenerateHTML = function(murdlets){
  var html = '<!DOCTYPE html> <meta charset="utf-8">'
  html += ' <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>'
  html += '<script src ="bundle.js"> </script>';
 html += '<script>$(document).ready(function(){ CreatePage(' + JSON.stringify(murdlets) + ');});</script>';
  html +=' <body>   Hey There </body>';
  return html;
}
// var GenerateMurdlets = function(murdlet)






// Page Hosting ///////////////////////////////////////////////////

// user goes to a page with their fid in the req.query
// they get served a page that will use the client-murdlets to draw a page once it gets hold of a murdlet's string representation

// var HostMurdlet = function(){
//   app.get("/murdlet",function(req,res){
//     var fid = req.query.fid;

//     var html = GenerateHTML();
//     // var url = path.join(__dirname, _root_dir, "index.html")
//     // res.sendFile(url);
//     res.end(html);
//   });
// }
var HostUpload = function(){
  var multipartMiddleware = multiparty();

   // var my_parser = bodyParser.raw(
   //    {
   //      // extended: false,
   //      // limit: "2mb"
   //    }
   //  );  
   app.post("/images",multipartMiddleware,function(req,res){
     console.log(req.body); 
     console.log("POST");
     console.log(req.files);
     
     res.end("POST REQUEST");
    // var url = path.join(__dirname, _root_dir, "index.html")
    // res.sendFile(url);
  });
  app.get("/images",function(req,res){
     console.log(req.query);
     console.log("GET");
     res.end("GET");
    // var url = path.join(__dirname, _root_dir, "index.html")
    // res.sendFile(url);
  });


  // app.use(function(req, res) {
  //   req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  //     // ... 
  //   });
  //   req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
  //     // ... 
  //   });
  //   req.pipe(req.busboy);
  //   // etc ... 
  // });

}

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
// TestImageUpload();


Listen();
HostIndex();
HostBundle();
HostSubmitMurdlet();
HostListMurdlets();
HostUI();
HostCarousel();
HostUpload();
// HostMurdlet(); 