/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-25
 * Time: 上午11:17
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');

exports.read = function(req, res){
    var Document = req.models.document;
    var document_id = req.params.id || 1;
    var document;
    Document.get(1, function(err, item){
        document = item;
    });
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
            console.log(document);
            res.render('travel/read', {items : items, pageCount : pageCount, commentCount:commentCount,document:document});
        });
    });


};




