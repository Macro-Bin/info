/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-25
 * Time: 下午1:26
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $('ul.polaroids li a').fancybox({
//        prevEffect : 'none',
//        nextEffect : 'none',

        closeBtn  : true,
        arrows    : true,
        nextClick : true,

        helpers : {
            thumbs : {
                width  : 50,
                height : 50
            }
        }
    });
});