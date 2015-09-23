$(function () {
    $('.hero_item').remove();
    $('.color_item').click(function () {
        $('.color_item.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.hero_item').hide();
        $('.hero_item.' + $(this).attr('id')).show();
    });
    var $list = $('#heroes_list');
    Object.keys(skins).forEach(function (type) {
        Object.keys(skins[type]).forEach(function (color) {
            var $hero = $('<div></div>');
            $hero.addClass('hero_item ' + type + ' ' + color);
            $hero.attr('id', type + ',' + color);
            $hero.css({
                backgroundImage: 'url(' + skins[type][color] + ')'
            });
            $hero.hide();
            $hero.appendTo($list);
            $hero.click(function () {
                $('.hero_item.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#hero_picture').css({
                    backgroundImage: $(this).css('background-image')
                })
            });
            if (type === selectedSkin[0] && color === selectedSkin[1]) {
                $hero.trigger('click');
            }
        });
    });
    $('.hero_item.' + $('.color_item.selected').attr('id')).show();
    $('.color_item#' + selectedSkin[1]).trigger('click');
    $('#lab_button').click(function () {
        $.getJSON('/profile', {
            skin: $('.hero_item.selected').attr('id')
        });
        document.location.href = '/lab';
    });
    $('#tutorial').click(function () {
        $.getJSON('/profile', {
            skin: $('.hero_item.selected').attr('id')
        });
        document.location.href = '/tutorial';
    });

});