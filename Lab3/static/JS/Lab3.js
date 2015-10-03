$(document).ready(function(){
    $("#getButton").click(function(){
        $('#result').val("");
        $("#getFade").fadeIn();
    });
    $("#getButtonSub").click(function(){
         if($('#NYT').is(':checked')) {
        $.ajax({
            type: "GET",
            url: "api/nyt/",
            data: {'data':encodeURI($('#getInput').val())},
            success: function(data,status,settings) {
                //$( "<p>Test</p>" ).insertAfter(".cover-container");
                // var output = document.getElementById("result");
                // output.value ="";
                for (i = 0; i <10; i++) {
                    line=JSON.stringify(data['response']['docs'][i]['headline']['main']);
                    link=JSON.stringify(data['response']['docs'][i]['web_url']);
                    blank="_blank";
                    $("<a href="+link+">"+line+"</a><br>").insertAfter(".cover-container");
                    // output.value = output.value+(JSON.stringify(data['response']['docs'][i]['headline']['main']));
                    // output.value = output.value+ "\n";
                }
            },
            error:function(data,errorThrown){
                $('#result').val("An error occured!");
            }
        });
    }
    else {
        $.ajax({
            type: "GET",
            url: "api/nyt/static/",
            data: {'data':encodeURI($('#getInput').val())},
            success: function(data) {
                // var output = document.getElementById("result");
                // output.value ="";
                for (i = 0; i <10; i++) {
                    line=JSON.stringify(data['response']['docs'][i]['headline']['main']);
                    link=JSON.stringify(data['response']['docs'][i]['web_url']);
                    blank="_blank";
                    $("<a href="+link+">"+line+"</a><br>").insertAfter(".cover-container");
                    // output.value = output.value+(JSON.stringify(data['response']['docs'][i]['headline']['main']));
                    // output.value = output.value+ "\n";
                }
            },
            error:function(data,errorThrown){
                $('#result').val("An error occured!");
            }
        });


    }
    });
});
