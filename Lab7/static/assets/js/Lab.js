$(document).ready(function(){
    $("#getButton").click(function(){
        $('#result').val("");
    });
    $("#getButtonSub").click(function(){
        $('.ResultText').empty();
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
                    $('.ResultText').append("<a target=\"_blank\" href="+link+">"+line+"</a><br>");
                 }
            },
            error:function(data,errorThrown){
            }
        });
    }
    });
    $("#loadStatic").click(function(){
        $('.ResultText').empty();
        $.ajax({
            type: "GET",
            url: "api/nyt/static/",
            success: function(data) {
                var myObject = JSON.parse(data)
                for (i = 0; i <10; i++) {
                    line=myObject.response.docs[i].headline.main
                    link=myObject.response.docs[i].web_url
                    $('.ResultText').append("<a target=\"_blank\" href="+link+">"+line+"</a><br>");
                }
            },
            error:function(data,errorThrown){
                $('#result').val("An error occured!");
            }
        });
    });
});
