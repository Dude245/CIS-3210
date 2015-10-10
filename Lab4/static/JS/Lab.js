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
                //console.log(JSON.parse(data))
                var myObject = JSON.parse(data)
                console.log(myObject.response.docs.length)
                for (i = 0; i<myObject.response.docs.length ; i++) {
                    // console.log(myObject.response.docs[0].headline.main)
                    // console.log(myObject.response.docs[0].web_url)
                    line=myObject.response.docs[i].headline.main
                    link=myObject.response.docs[i].web_url
                    $('.ResultText').append("<a target=\"_blank\" href="+link+">"+line+"</a><br>");
                 }
            },
            error:function(data,errorThrown){
            }
        });
    }
    });
});
