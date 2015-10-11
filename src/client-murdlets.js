var client_murdlets = function(facebooker){
  var GM = require('./google-maps.js');
  var google_maps = new GM();

  var BuildPage = function(murdlet){
    return $("<div>")
      .attr("class","well")
      .width("580px")
      .css("background-color","#181818")
      .css("color","#800000")
      // .attr("class","col-md-12")
      // .css("height","500px")
      .css("border-style","outset")
      .css("border-color","grey")
      .append(
        BuildHeader(facebooker.GetName(),murdlet.time)
      )
      .append(
        $("<div>")
          .height("400px")
          .append(
            BuildImage(murdlet.image_url)
              // .css("float","left")
              .attr("class","col-xs-6")
          )
          .append(
            $("<div>")
              .attr("class","col-xs-6")
              .append(
                BuildLocationMap(murdlet.latlng)
                  // .css("float","left")
              )
              .append($("<br>"))
              .append(
                BuildCommentBox(murdlet.fid, murdlet.comment))
                  .attr("class","col-xs-6")
              )
      )
      // .append($("<div class=clearfix>"))
      // .append(BuildCommentBox(murdlet.fid, murdlet.comment));
      
  }
  var BuildHeader = function(name, time){
    return $("<div>")
      .css("width","540px")
      .css("font-family","Nosifer")
      // .css("height","80px")
      .append(
        BuildName(name)
          .css("float","left")
      )
      .append(
        BuildTimestamp(time)
          .css("float","right")
      )
      .append(
        BuildClearfix()
      )
  }

  var BuildName = function(name){
    return $("<h2>")
      .text(name)
  }
  var BuildTimestamp = function(time){
    return $("<h2>")
      .text(time)
  }

  var BuildImage = function(url){
    return $("<div>")
      // .attr("class", "col-md-6")
      .width("270px")
      .height("400px")
      // .css("background-color",'red')
      .append(
        $("<img>")
          .attr("src",url)
          .width("240px")
          .height("400px")
       )
  }
  var BuildLocationMap = function(latlng){
    return $("<div>")
      .height("192px")
      .append(
        $("<img>")
          .attr("src",google_maps.GetMapURL(latlng))
          .width("240px")
          // .height("400px")
      )
  }


  var BuildCommentBox = function(fid, comment){
    var url = facebooker.GetProfilePicture(fid);
    var blood_url = "http://www.clker.com/cliparts/K/h/M/Q/u/c/blood-splatter-hi.png";
    return $("<div>")
      // .attr("class","col-md-12")
      // .width("800px")
      // .height("150px")
      .append(
        $("<div>")
          .css("float","left")
          .append(
            $("<img>")
              .attr("src",url)
              .width("100px")
              .height("100px")
              // .css("position","absolute")
              .css("float","left")

            )
            .append(
              $("<img>")
                .attr("src",blood_url)
                .width("100px")
                .height("100px")
                .css("position","absolute")
                .css("left","15px")
            )
          )
        .append(
          BuildComment(comment)
        );
  }
  var BuildComment = function(comment){
    return $("<p>")
      .text("\"" + comment + "\"")
      // .css("font-style","italic")
      .css("font-size","x-large")
      .css("font-family","Special Elite")
  }

  var BuildClearfix = function(){
    return $("<div class='clearfix'>");
  }

  this.BuildPage = BuildPage;

}
module.exports = client_murdlets;