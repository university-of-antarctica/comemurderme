var FB = require('./fb.js');
var facebooker = new FB();

var AddFacebookLogin = function(){
  facebooker.Setup();
  var $btn = facebooker.BuildButton();
  var $div = facebooker.BuildStatusDiv();
  $("body").append($btn);
  $("body").append($div);
}

$(document).ready(function(){
  AddFacebookLogin();
})

