$(document).ready(function(){
    $("#getButton").click(function(){
        $('#result').val("");
        $("#getFade").fadeIn();
    });
    $("#getButtonSub").click(function(){
        $.ajax({
            type: "GET",
            url: "api/nyt/",
            data: {'data':$('#getInput').val()},
            success: function(data,status,settings) {
                var output = document.getElementById("result");
                output.value ="";
                for (i = 0; i <10; i++) {
                    output.value = output.value+(JSON.stringify(data['response']['docs'][i]['headline']['main']));
                    output.value = output.value+ "\n";
                }
            },
            error:function(data,errorThrown){
                $('#result').val("An error occured!");
            }
        });

    });
});
