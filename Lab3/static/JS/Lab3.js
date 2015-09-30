$(document).ready(function(){
    $("#getButton").click(function(){
        apiKey="6462dcd33e1d47bc2be98167e19c86ab:10:72958436"
        $('#result').val("");
        $("#getFade").fadeIn();
    });
    $("#getButtonSub").click(function(){
        $.ajax({
            type: "GET",
            url: "http://api.nytimes.com/svc/search/v2/article?format=json&query="+$('#getInput').val()+"&api-key="+apiKey,
            success: function(data,status,settings) {
                $('#result').val(JSON.stringify(data));
                //console.log(JSON.stringify(data));
                //alert(JSON.stringify(data));
            },
            error:function(data,errorThrown){
                $('#result').val("Error: "+errorThrown);
            }
        });

    });
    });
