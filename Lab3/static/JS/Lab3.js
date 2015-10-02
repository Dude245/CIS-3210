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
                var TheTextBox = document.getElementById("result");
                TheTextBox.value ="";
                for (i = 0; i < i<10; i++) {
                    TheTextBox.value = TheTextBox.value+(JSON.stringify(data['response']['docs'][i]['headline']['main']));
                    TheTextBox.value = TheTextBox.value+ "\n";

    }
            },
            error:function(data,errorThrown){
                $('#result').val("An error occured!");
            }
        });

    });
    });
