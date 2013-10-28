/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-28
 * Time: 上午9:57
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    $('#toTop').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});