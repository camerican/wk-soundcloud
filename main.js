$(document).ready(function(){
  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
    // redirect_uri: 'http://example.com/callback'
  });
  // assuming a "track" object is captured, we want:
  // track.stream_url
  // track.artwork_url OR track.user.avatar_url
  // track.duration (milliseconds)

  SC.get("/tracks").then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
      $("ul").append("<li data-stream='"+ response[i].stream_url.match(/\/tracks\/[0-9]+/)[0] + "' data-duration='" + response[i].duration + "'>" + response[i].title + "</li>");
    }
  }).then(function(){
    $("ul li").click(function(event){
      console.log(event);
      //to do: replace url with our stream-url
      SC.stream( $(event.target).attr('data-stream') ).then(function(player){
        player.play();
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
});

//curl 'https://api.soundcloud.com/me/activities?limit=1&oauth_token=f665fc458615b821cdf1a26b6d1657f6'