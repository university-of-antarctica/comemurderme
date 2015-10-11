var FB = require('./fb.js');
var facebooker = new FB();
var Murdlets = require('./client-murdlets.js');
var client_murdlets = new Murdlets(facebooker);

var AddFacebookLogin = function(){
  var $btn = facebooker.BuildButton();
  // var $div = facebooker.BuildStatusDiv();
  $("body").append($btn);
  // $("body").append($div);
}

var CreatePage = function(murdlets){
  murdlets.forEach(function(murdlet){
    $("body").css("margin-left","50px");
    $("body").append(client_murdlets.BuildPage(murdlet));
  })
}

var LoadMurdlets = function(){
  $.ajax(
    {
      url:"/list",
      data:"fid=10205778030951425"
    }
  ).done(function(data){
    // console.log(data);
    CreatePage(JSON.parse(data));
  });
}



window.CreatePage = CreatePage;

$(document).ready(function(){
  facebooker.Setup(function(){
    if(!facebooker.IsLoggedIn()){
      AddFacebookLogin();
    }
    else{
      console.log(facebooker.GetID());
      LoadMurdlets();
    }
  });
  
  // document.BuildPage = murdlets.BuildPage;
})


