$(document).ready(function(){
  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
    // redirect_uri: 'http://example.com/callback'
  });
  // assuming a "track" object is captured, we want:
  // track.stream_url
  // track.artwork_url OR track.user.avatar_url
  // track.duration (milliseconds)

  SC.get("/tracks", {q: "fish"}).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      var art = response[i].artwork_url;
      if( !art ) art = response[i].user.avatar_url
      $("ul").append("<li data-stream='"+ response[i].stream_url.match(/\/tracks\/[0-9]+/)[0] + "' data-duration='" + response[i].duration + "'>" + response[i].title + "<img src='"+ art +"' /></li>");
    }
  }).then(function(){
    $("ul li").click(function(event){
      console.log(event);
      //to do: replace url with our stream-url
      SC.stream( $(event.target).attr('data-stream') ).then(function(player){
        console.log(player);
        player.play();
        //listen for a song finished event
        player.on("finish",function(){
          console.log( "Done-zo" );
        });
      });
    });
    console.log("inside then");
  });

  // SC.oEmbed('http://soundcloud.com/forss/flickermood', {
  //   auto_play: true
  // }).then(function(data){
  //   $("body").append(data.html);
  //   console.log('oEmbed response: ', data);
  // });
  //curl "http://api.soundcloud.com/tracks/13158665?client_id=f665fc458615b821cdf1a26b6d1657f6&q=fish"
});

//curl 'https://api.soundcloud.com/me/activities?limit=1&oauth_token=f665fc458615b821cdf1a26b6d1657f6'