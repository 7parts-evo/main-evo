function button(id, state) {
    $.getJSON('requests', {
        id: id,
        state: state,
        admin: $('#admin-'+id).is(':checked')
    }, function (data) {
        var $elem = $('#req-' + id);
        if (data.result == '1') {
            $elem.removeClass('declined');
            $elem.removeClass('unsorted');
            $elem.addClass('accepted');
        } else if (data.result == '0') {
            $elem.removeClass('accepted');
            $elem.removeClass('unsorted');
            $elem.addClass('declined');
        }
    })
}