
/*
 * GET home page.
 */

var https = require('https');

var baseUrl = 'https://api.weibo.com/2';
var uid = 1729616492;
var access_token =  '2.00MQSDtB_bdlGB168504624e_zozyD';
var source = 1016144493;
var count = 3;
var friends_timeline = '/statuses/friends_timeline.json?uid='+uid+'&access_token='+access_token+'&source='+source+'&count='+count;
var user_timeline = '/statuses/user_timeline.json?uid='+uid+'&access_token='+access_token+'&source='+source+'&count='+count;
var wbChunk="";
exports.home = function(req,res){
    https.get(baseUrl+user_timeline, function(apiResponse) {

        apiResponse.setEncoding('utf8');
        apiResponse.on('data',function(chunk){
            wbChunk += chunk;
        });
        apiResponse.on('error', function(e) {
            if(e) throw e;
            console.error("error info:"+e.message);
        });
        apiResponse.on('end',function(){
            var wbJson=null;
            try{
                wbJson = JSON.parse(wbChunk);
            }catch(e){
                wbJson = ""
            }

            res.render('index',{weiboJson : wbJson});
        });
    });



};

