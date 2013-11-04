/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 10/21/13
 * Time: 8:16 PM
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');
exports.create = function(req,res){
     res.render("blog/create");
 };

exports.save = function(req,res){
    var Document = req.models.document;
    var content = req.body.content|| res.json({isSuccess:false});
    var category = "blog";
    var conBuffer = new Buffer(content, "utf-8");
    Document.create({
        content : conBuffer,
        category : category
    },function(err,item){
        if(err) throw err;
    });
    res.json({isSuccess:true});
};

exports.read = function(req, res){
    var Document = req.models.document;
    var document;
    Document.get(5, function(err, item){
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
    Comment.find({document_id:5}).order('-createTime').limit(pageSize).all(function(error, comments){
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
            res.render('blog/read', {items : items, pageCount : pageCount, commentCount:commentCount,document:document});
        });
    });
};


