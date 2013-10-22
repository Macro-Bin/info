/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 10/21/13
 * Time: 8:44 PM
 * To change this template use File | Settings | File Templates.
 */
var comment = require('../controllers/comment');
var reply = require('../controllers/reply');
var paginator = require('../controllers/paginator');
var blog = require('../controllers/blog');
var index = require('../controllers/index');

module.exports = function (app) {
    // home page
    app.get('/', index.home);
    app.get('/comment/read', comment.read);
    app.post('/comment/create', comment.create);
    app.post('/reply/create', reply.create);
    app.get('/paginator/:page/read/', paginator.findPage);
    app.get('/paginator/update/', paginator.update);
};