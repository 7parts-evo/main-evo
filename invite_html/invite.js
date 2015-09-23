function show_message(x) {
    var opacity = document.getElementById('opacity');
    var thanks = document.getElementById('thanks');
    var error = document.getElementById('error');

    if (x == 1) {
        $('#button').click(function () {
            $("#opacity").fadeIn("slow");
            $("#thanks").fadeIn("slow");
            opacity.style.display = 'inherit';
            thanks.style.display = 'inherit';
            error.style.display = 'none';
        });
    }
    if (x == 2) {
        $('#button').click(function () {
            $("#opacity").fadeIn("slow");
            $("#error").fadeIn("slow");
            opacity.style.display = 'inherit';
            thanks.style.display = 'none';
            error.style.display = 'inherit';
        });
    }
};
show_message(2);
