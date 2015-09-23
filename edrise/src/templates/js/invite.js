function show_message(x) {
    var opacity = document.getElementById('opacity');
    var thanks = document.getElementById('thanks');
    var error = document.getElementById('error');

    if (x == 1) {
        $("#opacity").fadeIn("slow");
        $("#thanks").fadeIn("slow");
        opacity.style.display = 'inherit';
        thanks.style.display = 'inherit';
        error.style.display = 'none';
    }
    if (x == 2) {
        $("#opacity").fadeIn("slow");
        $("#error").fadeIn("slow");
        opacity.style.display = 'inherit';
        thanks.style.display = 'none';
        error.style.display = 'inherit';
    }
}
$(function () {
    $('#button').click(function () {
        $.getJSON('/invite', {
            name: $('#name').val(),
            login: $('#login').val(),
            age: $('#age').val(),
            status: $('#status').val(),
            city: $('#city').val(),
            hobby: $('#hobby').val(),
            reason: $('#reason').val(),
            email: $('#email').val()
        }, function (data) {
            show_message(+data.result);
        });
    });
});
