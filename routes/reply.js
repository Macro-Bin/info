/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-14
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */
exports.create = function(req, res){
    var Reply = req.models.reply;
    var name = req.body.name;
    var comment = req.body.comment;
    if(comment == ""){
        res.json({isSuccess:false});
    }
    var cid = req.body.cid;
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    if(name == ""){
        name="佚名";
    }
    Reply.create({
        content : comment,
        username : name,
        createTime : now,
        rep_id : cid
    },function(err,items){
        if(err){
            res.json({isSuccess:false});
        }
        res.json({
            isSuccess:true,
            content : comment,
            username : name,
            createTime : now
        });
    });
};