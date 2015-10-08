$(document).ready(function(){
    $("#getButton").click(function(){
        $('#result').val("");
    });
    $("#getButtonSub").click(function(){
        $('.ResultText').empty();
        $.ajax({
            type: "GET",
            url: "api/nyt/",
            data: {'data':encodeURI($('#getInput').val())},
            success: function(data,status,settings) {
                for (i = 0; i<10 ; i++) {
                    line=JSON.stringify(data['response']['docs'][i]['headline']['main']);
                    link=JSON.stringify(data['response']['docs'][i]['web_url']);
                    $('.ResultText').append("<a target=\"_blank\" href="+link+">"+line+"</a><br>");
                }
            },
            error:function(data,errorThrown){
                $('#result').val("An error occured!");
            }
        });
    });
});
