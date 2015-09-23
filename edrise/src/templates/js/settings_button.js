$(function(){
    var setButton = document.getElementById("settings_button");
    var setWindow = document.getElementById("settings_menu");
    setButton.onclick = function(e){
        setWindow.style.display = "block";
    };
    var closeButton = document.getElementById("cross_button");
    closeButton.onclick = function(e) {
        setWindow.style.display = "none";
    };
});