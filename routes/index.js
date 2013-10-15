
/*
 * GET home page.
 */
exports.index = function(req, res){
    var Comment = req.models.comment;
    var comments = new Array();
    var cs = Comment.find().order('-createTime').all(function(error, comments){
        if(error)
            throw error;
        res.render('index', { title: 'Message Board',comments: comments });
    });
};