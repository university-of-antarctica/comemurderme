var client_murdlets = function(){
  var FB = require('./fb.js');
  var fb = new FB();
  var GM = require('./google-maps.js');
  var google_maps = new GM();

  var BuildPage = function(murdlet){
    return $div = $("<div>")
      .css("background-color","wheat")
      .css("width","500px")
      .css("height","500px")
      .css("border-style","outset")
      .css("border-color","grey")
      .append(BuildImage(murdlet.image_url))
      .append(BuildCommentBox(murdlet.fid, murdlet.comment))
      .append(BuildLocationMap(murdlet.latlng));
  }

  var BuildImage = function(url){
    return $("<img>")
      .attr("src",url)
  }
  var BuildCommentBox = function(fid, comment){
    var url = fb.GetProfilePicture(fid);
    return $("<div>")
      .append(
        $("<img>")
          .attr("src",url)
          .css("float","left")
      )
      .append(
        BuildComment(comment)
      );
  }
  var BuildComment = function(comment){
    return $("<h1>")
      .text("\"" + comment + "\"")
      .css("font-style","italic");
  }
  var BuildLocationMap = function(latlng){
    return $("<img>")
      .attr("src",google_maps.GetMapURL(latlng));
  }

  this.BuildPage = BuildPage;

}
module.exports = client_murdlets;