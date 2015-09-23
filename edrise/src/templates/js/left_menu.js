$(function(){
   var elem = document.getElementById("arrow_button");
   var parent = document.getElementById("left_menu");
   var buttonBack = document.getElementById("arrow_button_back");
    elem.onclick = function(e){
        parent.style.left = "-20px";
        elem.style.display = "none";
    };
    buttonBack.onclick = function(e){
        parent.style.left = "-175px";
        elem.style.display = "block";
    };
});