/**
 * Created with JetBrains WebStorm.
 * User: lonso
 * Date: 13-10-15
 * Time: 下午1:40
 * To change this template use File | Settings | File Templates.
 */

var orm = require("orm");
var db  = orm.connect("mysql://root:@127.0.0.1/nodejs");
module.exports.db = db;