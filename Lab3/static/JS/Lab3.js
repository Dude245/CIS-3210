$(document).ready(function(){
    $("#getButton").click(function(){
        apiKey="6462dcd33e1d47bc2be98167e19c86ab:10:72958436"
        $('#result').val("");
        $("#getFade").fadeIn();
    });
    $("#getButtonSub").click(function(){
        $.ajax({
            type: "GET",
            url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$('#getInput').val()+"&api-key="+apiKey,
            success: function(data,status,settings) {
                var title = data.response.snippet;
                console.log(title);
            //     $('#result').val(JSON.stringify(data));
            //     var json = JSON.parse(JSON.stringify(data));
	        //     alert(json.response.snippet); //mkyong
            },
            error:function(data,errorThrown){
                $('#result').val("Error: "+errorThrown);
            }
        });

    });
    });
