$(document).ready(function(){
    $("#getButton").click(function(){
        $('#result').val("");
        $("#postFade").fadeOut(0);
        $("#putFade").fadeOut(0);
        $("#delFade").fadeOut(0);
        $("#getFade").fadeIn();
    });
    $("#getButtonSub").click(function(){
        $.ajax({
            type: "GET",
            url: "/api/"+$('#getInput').val(),
            success: function(data,status,settings) {
                $('#result').val(JSON.stringify(data));
                //console.log(JSON.stringify(data));
                //alert(JSON.stringify(data));
            },
            error:function(data){
                $('#result').val("Error 404");
                //alert("Error, Not found");
            }
        });

    });
    $("#putButton").click(function(){
        $('#result').val("");
        $("#postFade").fadeOut(0);
        $("#getFade").fadeOut(0);
        $("#delFade").fadeOut(0);
        $("#putFade").fadeIn();
    });
    $("#putButtonSub").click(function(){
        $.ajax({
            url : "/api/" +$('#putInput1').val(),
            type: "PUT",
            data: {'data':$('#putInput2').val()},
            success: function(data, textStatus, jqXHR)
            {
                $('#result').val("Success");
                //console.log(JSON.stringify(data));
                //alert("Added the Value");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                $('#result').val("Error"+errorThrown);
            }
        });
    });
    $("#postButton").click(function(){
        $('#result').val("");
        $("#putFade").fadeOut(0);
        $("#getFade").fadeOut(0);
        $("#delFade").fadeOut(0);
        $("#postFade").fadeIn();
    });
    $("#postButtonSub").click(function(){
        $.ajax({
            url : "/api/" +$('#postInput1').val(),
            type: "POST",
            data: {'data':$('#postInput2').val()},
            success: function(data, textStatus, jqXHR)
            {
                $('#result').val("Success");
                //console.log(JSON.stringify(data));
                //alert("Added the Value");
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                $('#result').val("Error"+errorThrown);
                //alert("Error: " + errorThrown);
            }
        });
    });

    $("#delButton").click(function(){
        $('#result').val("");
        $("#putFade").fadeOut(0);
        $("#postFade").fadeOut(0);
        $("#getFade").fadeOut(0);
        $("#delFade").fadeIn();
        $("#delButtonSub").click(function(){
            $.ajax({
                type: "DELETE",
                url: "/api/"+$('#delInput').val(),
                success: function() {
                    $('#result').val("Deleted");
                    //alert("Deleted");
                },
                error: function(jqXHR, textStatus, errorThrown){
                    $('#result').val("Error deleting");
                    //alert("Error deleting")
                }
            });
        });
    });
});
