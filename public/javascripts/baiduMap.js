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
    });          // 禁止点击地图

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
//    map.addEventListener('mouseover', function(){
//        $('div#map').fadeTo(500, 0.8);
//    });
//    map.addEventListener('mouseout', function(){
//        $('div#map').fadeTo(500,1);
//    });

    var shangHai = new BMap.Point(121.480241600730, 31.236303559490);
    var liJiang = new BMap.Point(100.234235014450, 26.861019530720);
    var huaShang = new BMap.Point(110.075999190170, 34.484805966890);
    var xiAn = new BMap.Point(108.946635024090,34.34780545453);
    var jiuZhaiGou = new BMap.Point(103.924865365040, 33.266159367890);
    var qingChengShan = new BMap.Point(103.578826980920, 30.903721245860);
    var beiHai = new BMap.Point(109.126469205100, 21.487026189620);
    var guiLin = new BMap.Point(110.296646835200, 25.279812442760);
    var yangShuo = new BMap.Point(110.503035763080, 24.784699151180);
    var taErShi = new BMap.Point(101.572301204700, 36.493825178290);
    var chaKaYanHu = new BMap.Point(99.118800778450, 36.707715535290);
    var yueYaQuan = new BMap.Point(94.681963741590, 40.094478784350);
    var moGaoKu = new BMap.Point(94.815517279450, 40.047708473220);
    var yaDan = new BMap.Point(93.197356789690, 40.441587757870);
    var qingHaiHu = new BMap.Point(100.356316263050,36.765889260380);
//
//    var markerIcon = new BMap.Icon("images/marker.ico", new BMap.Size(32, 32),{
//        anchor: new BMap.Size(17, 30)
//    });

    function ComplexCustomOverlay(point, mouseoverText, flag){
        this._point = point;
        this._overText = mouseoverText;
        this._flag = flag;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = this._div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.style.width = "32px";
        div.style.height = "32px";
        div.className = "mapInfoDiv";
        div.style.background = "url(/images/marker.ico) no-repeat";
        div.style.top = "30px";
        div.style.left = "17px";
        var content = this._overText;
        div.onmouseover = function(){
            $(this).popover({content:content,placement:"right"});
            $(this).popover('show');
        };
        var that = this;
        div.onmouseout = function(){
               $(this).popover('hide');
        };

        div.onclick = function(){
            self.location='/travel/'+that._flag;
        };
        map.getPanes().labelPane.appendChild(div);
        return div;
    };
    ComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - 17 + "px";
        this._div.style.top  = pixel.y - 30 + "px";
    };

    var shangHaiOerlay = new ComplexCustomOverlay(shangHai, "上海 -2010-04",1);
    var liJiangOverlay = new ComplexCustomOverlay(liJiang, "丽江 -2008-08",1);
    var huaShangOverlay = new ComplexCustomOverlay(huaShang, "华山 -2009-08",1);
    var xiAnOverlay = new ComplexCustomOverlay(xiAn, "西安 -2009-08",1);
    var jiuZhaiGouOverlay = new ComplexCustomOverlay(jiuZhaiGou, "九寨沟 -2010-01",1);
    var qingChengShanOverlay = new ComplexCustomOverlay(qingChengShan, "青城山 -2010-05",1);
    var beiHaiOverlay = new ComplexCustomOverlay(beiHai, "北海 -2012-10",1);
    var guiLinOverlay = new ComplexCustomOverlay(guiLin, "桂林 -2012-10",1);
    var yangShuoOverlay = new ComplexCustomOverlay(yangShuo, "阳朔 -2012-10",1);
    var taErShiOverlay = new ComplexCustomOverlay(taErShi, "塔尔寺 -2012-10",1);
    var chaKaYanHuOverlay = new ComplexCustomOverlay(chaKaYanHu, "茶卡盐湖 -2012-10",1);
    var yueYaQuanOverlay = new ComplexCustomOverlay(yueYaQuan, "月牙泉 -2012-10",1);
    var moGaoKuOverlay = new ComplexCustomOverlay(moGaoKu, "莫高窟 -2012-10",1);
    var yaDanOverlay = new ComplexCustomOverlay(yaDan, "雅丹 -2012-10",1);
    var qingHaiHuOverlay = new ComplexCustomOverlay(qingHaiHu, "青海湖 -2012-10",1);

    map.addOverlay(shangHaiOerlay);
    map.addOverlay(liJiangOverlay);
    map.addOverlay(huaShangOverlay);
    map.addOverlay(xiAnOverlay);
    map.addOverlay(jiuZhaiGouOverlay);
    map.addOverlay(qingChengShanOverlay);
    map.addOverlay(beiHaiOverlay);
    map.addOverlay(guiLinOverlay);
    map.addOverlay(yangShuoOverlay);
    map.addOverlay(taErShiOverlay);
    map.addOverlay(yueYaQuanOverlay);
    map.addOverlay(chaKaYanHuOverlay);
    map.addOverlay(yaDanOverlay);
    map.addOverlay(qingHaiHuOverlay);
    map.addOverlay(moGaoKuOverlay);


});