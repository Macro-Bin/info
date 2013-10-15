
/*
 * GET home page.
 */
exports.index = function(req, res){
    var Comment = req.models.comment;
    var comments = new Array();
    Comment.find(function(err, comment){
        console.log(comment.username);
        comments.push(comment);
    });
    res.render('index', { title: 'Message Board',comments: comments });

};