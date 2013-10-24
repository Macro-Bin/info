/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-23
 * Time: 上午9:02
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var map = new BMap.Map("map",{
        enableMapClick: false
    });          // 创建地图实例
    var shangHai = new BMap.Point(121.480241600730, 31.236303559490);
    var liJiang = new BMap.Point(100.234235014450, 26.861019530720);
    var  mapStyle ={
        features: [],
        style : "dark"
    };
    map.setMapStyle(mapStyle);
    map.centerAndZoom("成都",5);
//    map.panTo(point);
    //禁用操作设置
    map.disableDragging();
    map.disableDoubleClickZoom();
    map.disableKeyboard();
    map.disableInertialDragging();
    map.disablePinchToZoom();

    map.addEventListener('tilesloaded',function(){
        $('div#map div.anchorBL').remove();
    });

    //渐进效果
    map.addEventListener('mouseover', function(){
        $('div#map').fadeTo(500, 0.8);
    });
    map.addEventListener('mouseout', function(){
        $('div#map').fadeTo(500,1);
    });

    var markerIcon = new BMap.Icon("images/marker.ico", new BMap.Size(32, 32),{
        anchor: new BMap.Size(17, 30)
    });
    var shangHaiMarker = new BMap.Marker(shangHai, {icon: markerIcon});
    var liJiangMarker = new BMap.Marker(liJiang, {icon: markerIcon});
    map.addOverlay(shangHaiMarker);
    map.addOverlay(liJiangMarker);
    var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" +
            "<img style='float:left;margin:4px' id='imgDemo' src='http://app.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" +
            "</div>";
    var infoWindow = new BMap.InfoWindow(sContent,{enableMessage:false});  // 创建信息窗口对象
    shangHaiMarker.addEventListener("mouseover", function(type, target, point,pixel){
        map.openInfoWindow(infoWindow,shangHai); //开启信息窗口
    });





});