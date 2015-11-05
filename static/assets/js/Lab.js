$(document).ready(function(){
  value = getCookie("0797359KeyWord")
  if(value=="")
  {
    value="networking"
  }
  $.ajax({
      type: "GET",
      url: "api/nyt/",
      data: {'data':value},
      success: function(data,status,settings) {
          var myObject = JSON.parse(data)
          for (i = 0; i<=myObject.length-1; i++) {
              line=myObject[i].headline.main
              link=myObject[i].web_url
              snipp=JSON.stringify(myObject[i].snippet);
              $("#Search").append("<a target=\"_blank\"  href="+link+" title="+snipp+"><h5>"+line+"</h5></a>");
           }
      },
      error:function(data,errorThrown){
      }
  });
  $.ajax({
      type: "GET",
      url: "/api/nyt/movies/",
      success: function(data) {
          for (i = 0; i <12; i++) {
            line=data['results'][i]['display_title'];
            link=JSON.stringify(data['results'][i]['link']['url']);
            snipp=JSON.stringify(data['results'][i]['summary_short']);
            pic=JSON.stringify(data['results'][i]['multimedia']['resource']['src']);
            // $("#Movies").append("<img src="+pic+">")
            $("#Movies").append("<a target=\"_blank\"  href="+link+" title="+snipp+"><p>"+line+"</p></a>");
          }
      },
      error:function(data,errorThrown){
          $('#result').val("An error occured!");
      }
  });
  $.ajax({
      type: "GET",
      url: "/api/nyt/top/",
      success: function(data) {
          for (i = 0; i <10; i++) {
            line=data['results'][i]['title'];
            link=JSON.stringify(data['results'][i]['url']);
            snipp=JSON.stringify(data['results'][i]['abstract']);
            src=data['results'][i]['media'][0]['media-metadata'][0]['url']
            pic1='<center><a class="fancybox-media" align="middle"  title="" height="80" width="80" href="'+src+'"><img align="middle" src="'+src+'" class="img-responsive img-rounded" alt="" height="80" width="80"/></a></center>'
            line2=data['results'][i]['abstract']

            $("#test").append("<div class=\"col-xs-12 col-sm-6 col-md-6 col-lg-6\">"+"<h4>"+line+"</h4>"+pic1+"<br><br>"+data['results'][i]['abstract']+"<br><br><br></div>");

            $("#TopStory").append("<a target=\"_blank\"  href="+link+" title="+snipp+"><h5>"+line+"</h5></a>");
          }
      },
      error:function(data,errorThrown){
          $('#result').val("An error occured!");
      }
  });
    $("#getButton").click(function(){
        $('#result').val("");
    });
    $("#getButtonSub").click(function(){
        $("#Search").empty();
        if($('#getInput').val()== ""){
            alert("Error: Cannot submit an empty search")
        }
        else {
        $.ajax({
            type: "GET",
            url: "api/nyt/",
            data: {'data':encodeURI($('#getInput').val())},
            success: function(data,status,settings) {
                setCookie('0797359KeyWord',$("#getInput").val(),30);
                var myObject = JSON.parse(data)

                for (i = 0; i<=myObject.length-1; i++) {
                    line=myObject[i].headline.main
                    link=myObject[i].web_url
                    snipp=JSON.stringify(myObject[i].snippet);

                    $("#Search").append("<a target=\"_blank\"  href="+link+" title="+snipp+"><h5>"+line+"</h5></a>");
                 }
            },
            error:function(data,errorThrown){
            }
        });
    }
    });
    function setCookie(name, value,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = name +"=" + value + ";"+ expires;

    }
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
    }
});
