/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-14
 * Time: 下午4:54
 * To change this template use File | Settings | File Templates.
 */
exports.create = function(req, res){

    var name = req.body.name;
    var comment = req.body.comment;
    res.send(name+'--sss-'+comment);
};