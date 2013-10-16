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
    var name = req.body.name;
    var comment = req.body.comment;
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    if(name == ""){
        name="佚名";
    }
    Comment.create({
        content : comment,
        username : name,
        createTime : now
    },function(err,items){
        if(err){
            res.json({isSuccess:false});
        }
        res.json({
            isSuccess:false,
            content : comment,
            username : name,
            createTime : now
        });
    });

};