$(document).ready(function(){
    value = getCookie("0797359Theme")
    $('#ThemeSelect').val(value)
    if(value == 'Original'){
      $('body').css('color',"#fff");
      $('body').css('background',"#333");
    }
    else if(value == 'Ugly'){
      $('body').css('color',"blue");
      $('body').css('background-image', 'url(' + 'Images/Ugly-boy.jpg' + ')');

    }
    else if(value == 'Fallout'){
      $('body').css('color',"Yellow");
      $('body').css('background-image', 'url(' + 'Images/fallout.jpg' + ')');
    }
    else if(value == 'Eye-Bleach'){
        $('body').css('color',"#fff");
      $('body').css('background-image', 'url(' + 'Images/cutecat.jpg' + ')');

    }


  $('#ThemeSelect').on('change',function(){
    if($("#ThemeSelect option:selected").text()=="Original"){
      $('body').css('color',"#fff");
      $('body').css('background', '#333');
    }
    if($("#ThemeSelect option:selected").text()=="Ugly"){
        $('body').css('color',"#fff");
        $('body').css('background-image', 'url(' + 'Images/Ugly-boy.jpg' + ')');
        $('body').css('color',"blue");
    }
    if($("#ThemeSelect option:selected").text()=="Fallout"){
        $('body').css('color',"Yellow");
        $('body').css('background-image', 'url(' + 'Images/fallout.jpg' + ')');
    }
    if($("#ThemeSelect option:selected").text()=="Eye-Bleach"){
        $('body').css('color',"#fff");
      $('body').css('background',"red");
      $('body').css('background-image', 'url(' + 'Images/cutecat.jpg' + ')');
    }
    setCookie('0797359Theme',$("#ThemeSelect option:selected").text())
  });

  function setCookie(name, value) {
    document.cookie = name +"=" + value + ";";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
});
