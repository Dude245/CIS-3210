clippy.load('Links', function(agent) {
    // Do anything with the loaded agent
    agent.show();
    // agent.play('GetArtsy');
    $("#animateKitty").click(function(e){
        agent.play('GetArtsy');
    });

});
