var facebooker = function(){

  var _app_id = '740619572749259';
  var _test_id = '740623989415484';

  var _text_status = "";
  var _callback = function(){};

  var _credentials = {
    logged_in:false,
    name:"", 
    id:""
  };


  function Setup(callback){
    SetCallback(_test_id);
    _callback = callback;
    LoadSDK();
  }

  function LoadSDK(){
  // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  var SetCallback = function(app_id){
    window.fbAsyncInit = function() {
      FB.init({
        "appId"      : app_id,
        "cookie"     : true,  // enable cookies to allow the server to access the session
        "xfbml"      : true,  // parse social plugins on this page
        "version"    : 'v2.5' // use version 2.2
      });
      CheckLoginState();
    };
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  var CheckLoginState = function() {
    FB.getLoginStatus(function(response) {
      StatusChanged(response);
    });
  }

 
  var StatusChanged = function(response){
    if(response.status === 'connected'){
      Connected(response);
    }
    else if(response.status === 'not_authorized'){
      NotAuthorized();
    }
    else{
      NotLoggedIn();
    }
  }

  // Possible Statuses after the Status changes

  var Connected = function(response){
    SetStatus("You are logged in to Facebook.");
    LoggedIn(response);
    // _callback();  Except it is asynchronous, so we call it later down the chain
  }

  var NotAuthorized = function(){
    // The person is logged into Facebook, but not your app.
    SetStatus('Please log into this app.');
    _callback();
  }

  var NotLoggedIn = function(){
   // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    SetStatus('Log into Facebook.');
    LoggedOut();
    _callback();
  }

  var SetStatus = function(status){
    _text_status = status;
    $("#facebook_status").text(_text_status);
  }

  // Log in and out


    // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  var LoggedIn = function(response){
    _credentials.id = response.authResponse.userID;
    FB.api('/me', function(response) {
      _credentials.name = response.name;
      // _credentials.id = response.id;
      _credentials.logged_in = true;
      _callback();
    });
  }


  var LoggedOut = function(){
    _credentials.logged_in = false;
    _credentials.name = "";
    _credentials.id = "";
  }



 
  // Exposed Functions

  function GetProfilePicture(user_id){
   return "http://graph.facebook.com/" + user_id + "/picture?type=normal"
  }
  
  function GetID(){
    if(_credentials.logged_in){
      return _credentials.id;
    }
    else{
      console.error("trying to get ID of someone not logged in to facebook");
      return undefined;
    }
  }

  var GetName = function(){
    if(_credentials.logged_in){
      return _credentials.name;
    }
    else{
      console.error("trying to get name of someone not logged in to facebook");
      return undefined;
    }
  }

  var IsLoggedIn = function(){
    return _credentials.logged_in;
  }

  var BuildButton = function(){
    var $btn = $('<fb:login-button>')
      .attr('scope',"public_profile,email")
      .attr('size','large')
      // convert this to a log out button if they are logged in
      // .attr('data-auto-logout-link','true') 
      .attr('onlogin','CheckLoginState');
      window.CheckLoginState = CheckLoginState;
    return $btn;
  };

  var BuildStatusDiv = function(){
    var $div = $("<div>")
      .attr("id","facebook_status")
      .text(_text_status);
    return $div;
  }


  this.Setup = Setup;
  this.BuildButton = BuildButton;
  this.BuildStatusDiv = BuildStatusDiv;
  this.GetID = GetID;
  this.GetName = GetName;
  this.GetProfilePicture = GetProfilePicture;
  this.IsLoggedIn = IsLoggedIn;

}

module.exports = facebooker;