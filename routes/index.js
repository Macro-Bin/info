
/*
 * GET home page.
 */
var async = require('async');
exports.index = function(req, res){
    var Comment = req.models.comment;
    var items = [];
    Comment.find().order('-createTime').all(function(error, comments){
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
            res.render('index', {items: items});
        });
    });
};