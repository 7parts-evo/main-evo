function show_message(x) {
    var opacity = document.getElementById('opacity');
    var welcome = document.getElementById('welcome');


    if (x == 1) {
        $('#welcome-button').click(function () {
            $("#opacity").fadeOut("slow");
            $("#thanks").fadeOut("slow");
            opacity.style.display = 'none';
            welcome.style.display = 'none';
        });
    }

};
show_message(1);
