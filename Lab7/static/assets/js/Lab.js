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
          for (i = 0; i <10; i++) {
            line=data['results'][i]['display_title'];
            link=JSON.stringify(data['results'][i]['link']['url']);
            snipp=JSON.stringify(data['results'][i]['summary_short']);
            $("#Movies").append("<a target=\"_blank\"  href="+link+" title="+snipp+"><h5>"+line+"</h5></a>");
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
    // $("#loadStatic").click(function(){
    //     $('.ResultText').empty();
    //     $.ajax({
    //         type: "GET",
    //         url: "api/nyt/static/",
    //         success: function(data) {
    //             var myObject = JSON.parse(data)
    //             for (i = 0; i <10; i++) {
    //                 line=myObject.response.docs[i].headline.main
    //                 link=myObject.response.docs[i].web_url
    //                 $('.ResultText').append("<a target=\"_blank\" href="+link+">"+line+"</a><br>");
    //             }
    //         },
    //         error:function(data,errorThrown){
    //             $('#result').val("An error occured!");
    //         }
    //     });
    // });
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
