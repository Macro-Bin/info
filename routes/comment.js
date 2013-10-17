/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-14
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */

var os = require('os');
var moment = require('moment');
exports.create = function(req, res){
    var Comment = req.models.comment;
    var name = req.body.name||"佚名";
    var comment = req.body.comment||res.json({isSuccess:false});
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    Comment.create({
        content : comment,
        username : name,
        createTime : now
    },function(err,item){
        if(err){
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