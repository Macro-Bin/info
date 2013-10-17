
/*
 * GET home page.
 */
var async = require('async');
var moment = require('moment');
function t(){
    console.log('done');
}
exports.index = function(req, res){
    var Comment = req.models.comment;
    var items = [];
    var pageCount;
    var pageSize = 10;
    var commentCount;
    Comment.count(function (err, count) {
        commentCount = count;
        pageCount = Math.ceil(count/pageSize);
    });
    Comment.find().order('-createTime').limit(pageSize).all(function(error, comments){
        async.each(comments, function(comment, callback) {
            comment.getReply(function(error, replys){
                var item = {};
                item["comment"] = comment;
                item["replys"] = replys;
                items.push(item);
                callback();
            });
        }, function(err) {
            if( err ) throw err;
            res.render('index', {items : items, pageCount : pageCount, commentCount:commentCount});
        });
    });
};