$(document).ready(function(){

  $.ajax({
      type: "GET",
      url: "/api/nyt/movies/",
      success: function(data) {
          //var myObject = JSON.parse(data)

          for (i = 0; i <10; i++) {
            line=data['results'][i]['display_title'];
            link=JSON.stringify(data['results'][i]['link']['url']);
            $("#Movies").append("<a target=\"_blank\" href="+link+"><h4>"+line+"</h4>");
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
            $("#TopStory").append("<a target=\"_blank\" href="+link+"><h4>"+line+"</h4>");
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
                var myObject = JSON.parse(data)
                for (i = 0; i<=myObject.length-1; i++) {
                    line=myObject[i].headline.main
                    link=myObject[i].web_url
                    $("#Search").append("<a target=\"_blank\" href="+link+"><h4>"+line+"</h4>");
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
});
