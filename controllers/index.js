
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

exports.home = function(req,res){
    https.get(baseUrl+friends_timeline, function(apiResponse) {
        apiResponse.on('data',function(chunk){
            var wbChunk = chunk.toString();
//            var wbJson = JSON.parse(wbChunk);
//            console.log(wbJson.statuses);
            res.render('index',{weiboJson : chunk.toString()});
    });

    }).on('error', function(e) {
            console.error("error info:"+e.message);
        });


};

