/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-14
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */

var os = require('os');
var moment = require('moment');
var async = require('async');
exports.create = function(req, res){
    var Comment = req.models.comment;
    var name = req.body.name || "佚名";
    var comment = req.body.comment || res.json({isSuccess:false});
    var document_id = req.body.flag || res.json({isSuccess:false});
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    Comment.create({
        content : comment,
        username : name,
        createTime : now ,
        document_id : document_id
    },function(err,item){
        if(err){
            console.log(err);
            res.json({isSuccess:false});
        }
        res.json({
            isSuccess : true,
            content : comment,
            username : name,
            createTime : now,
            cid : item.id
        });
    });

};

exports.read = function(req, res){
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
            res.render('comment', {items : items, pageCount : pageCount, commentCount:commentCount});
        });
    });
};