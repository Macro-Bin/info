/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-23
 * Time: 下午4:11
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $("div.weibo div[class^='weiboContent']").hover(function(){
        $("div.weibo div.weiboContent1").addClass("animated slideInLeft");
        $("div.weibo div.weiboContent2").addClass("animated slideInDown");
        $("div.weibo div.weiboContent3").addClass("animated slideInRight");
    });







});


