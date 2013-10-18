/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-17
 * Time: 上午11:55
 * To change this template use File | Settings | File Templates.
 */
var async = require('async');
var express = require('express');
var app = express();
exports.findPage = function(req,res){
    var Comment = req.models.comment;
    var currentPage = req.params.page;
    var pageSize = 10;
    var items = [];
    Comment.find().order('-createTime').limit(pageSize).offset(pageSize*(currentPage-1)).all(function(error, comments){
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
            res.render('main', {items: items});
        });
    });
};
exports.update = function(req, res){
    var Comment = req.models.comment;
    var pageCount;
    var pageSize = 10;
    var commentCount;
    Comment.count(function (err, count) {
        commentCount = count;
        pageCount = Math.ceil(count/pageSize);
        console.log("commentCount---"+commentCount);
        res.render('paginator', {pageCount : pageCount, commentCount:commentCount});
    });
};