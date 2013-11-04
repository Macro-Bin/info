
/*
 * GET home page.
 */

var https = require('https');
var request = require('request');
var url = require('url');
var querystring = require('querystring');
var baseUrl = 'https://api.weibo.com/2';
var token_base_url = 'https://api.weibo.com/oauth2/access_token';

var uid = 1729616492;
var access_token = '2.00MQSDtB_bdlGB168504624e_zozyD';
var source = 1016144493;
var count = 3;
var friends_timeline = '/statuses/friends_timeline.json?uid='+uid+'&access_token='+access_token+'&source='+source+'&count='+count;
var user_timeline = '/statuses/user_timeline.json?uid='+uid+'&access_token='+access_token+'&source='+source+'&count='+count;
var access_token_url = '?client_id='+1016144493+'&client_secret='+'e115c7e0a58dbb220154968bd444eba2&grant_type=authorization_code&redirect_uri=http://127.0.0.1:3000/getToken'
var document = "";
var testCount = 0;
exports.home = function(req,res){
    var Document = req.models.document;
    Document.get(5, function(err, item){
        document = item;
    });
    https.get(baseUrl+user_timeline, function(apiResponse) {
        var wbChunk="";
        apiResponse.setEncoding('utf8');
        apiResponse.on('data',function(chunk){
            wbChunk += chunk;
        });
        apiResponse.on('error', function(e) {
            console.error("error info:"+e.message);
            if(e) throw e;
        });
        apiResponse.on('end',function(){
            var wbJson=null;
            try{
                wbJson = JSON.parse(wbChunk);
                res.render('index',{weiboJson : wbJson, blog:document});
            }catch(e){
                console.log(e.message);
                if(e) throw e;
            }
        });
    });
};

exports.ieNotAgree= function(req,res){
      res.render("ieNotAgree");
};

exports.getToken = function(req, res){
    var code = querystring.parse(url.parse(req.url).query).code;
    request.post(token_base_url +access_token_url+"&code="+code , function (e, r, body){
        var access_token = JSON.parse(body).access_token;
        req.session.access_token = access_token;
        res.redirect("/");
    });
};

