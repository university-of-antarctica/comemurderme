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

var CreateUI = function(murdlets){
  $("body").css("margin-left","50px")
    .css("background-image","url(http://www.backgroundlabs.com/files/vampire-fangs-pattern-1437.png)")
     .css("background-repeat","repeat")
  murdlets.forEach(function(murdlet){
    $("body").append(client_murdlets.BuildPage(murdlet));
  })
}

var CreateCarousel = function(murdlets){
    var $div = $("<div>");
    murdlets.forEach(function(murdlet,index){
      $div.append(client_murdlets.BuildPage(murdlet));
    })
    $("body")
    .css("background-image","url(http://www.backgroundlabs.com/files/vampire-fangs-pattern-1437.png)")
     .css("background-repeat","repeat")
     .append($div);
    // setTimeout(function(){
      $div.children().hide();
      CycleThroughMurdlets($div);
    // }, 1000);

}

  var CycleThroughMurdlets = function(container){
    ShowNextMurdlet(container,0);
  }
      
  var ShowNextMurdlet = function(container,index){
    index = parseInt(index);
    var max = container.children().length;
    // console.log("max: " + max);
    index = (index >= max)? 0 : index;
    FadeInOneMurdlet(container,index);
    setTimeout(function(){
      ShowNextMurdlet(container,index+1);
    },3000);
  }
  var ShowOneMurdlet = function(container,index){
    container.children().hide();
    var index_from_1 = parseInt(index) + 1;
    container.children('div:nth-child('+index_from_1+')').show();
  }

  var FadeInOneMurdlet = function(container,index){
    container.children().fadeOut(200);
    var index_from_1 = parseInt(index) + 1;
    setTimeout(function(){
      container.children('div:nth-child('+index_from_1+')').fadeIn(200);
    }, 200);
  }















var LoadMurdlets = function(callback){
  $.ajax(
    {
      url:"/list",
      data:"fid=10205778030951425"
    }
  ).done(callback);
}


var GetPage = function(){
  var pathname = window.location.pathname;
  return pathname.slice(1);
}



$(document).ready(function(){

  var page = GetPage();
  var todo;
  if(page === ""){
    todo = function(data){
      CreateUI(JSON.parse(data));
    }
  }
  if(page === "carousel"){
    todo = function(data){
      CreateCarousel(JSON.parse(data));
    }
  }
  facebooker.Setup(function(){
    if(!facebooker.IsLoggedIn()){
      AddFacebookLogin();
      //TODO: does it work after we sign in?
    }
    else{
      LoadMurdlets(todo);
    }
  });

  
  
  // document.BuildPage = murdlets.BuildPage;
})


