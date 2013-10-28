/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 10/21/13
 * Time: 8:16 PM
 * To change this template use File | Settings | File Templates.
 */
exports.create = function(req,res){
     res.render("blog/create");
 };

exports.save = function(req,res){
    var Document = req.models.document;
    var content = req.body.content|| res.json({isSuccess:false});
    var category = "blog";
    console.log(content);

    var conBuffer = new Buffer(content, "utf-8");
    Document.create({
        content : conBuffer,
        category : category
    },function(err,item){
        if(err) throw err;
    });
    res.json({isSuccess:true});
};


