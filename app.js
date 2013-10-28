
/**
 * Module dependencies.
 */

var express = require('express');
var consolidate = require('consolidate');

var http = require('http');
var path = require('path');
var ejs = require('ejs');
var orm = require('orm');
var app = express();

//database orm settings
app.use(orm.express("mysql://root:@127.0.0.1/nodejs", {
    define: function (db, models, next) {
        db.settings.set("properties.primary_key", "id");
        db.settings.set("properties.association_key", "comm_id");
        models.comment = db.define("comment", {
            content : { type: "text" },
            createTime : { type: "date" },
            username : {type : "text"}
        });
        models.reply = db.define("reply", {
            content : { type: "text" },
            createTime : { type: "date" },
            username : {type : "text"}
        });
        models.document = db.define("document",{
           content : {type : "binary"},
           category : {type : "text"}
        });
        models.reply.hasOne('comment', models.comment, {reverse: 'reply'} );
        db.sync(function (err) {
            if(err) throw err;
            console.log("sync databases done!");
        });
        next();
    }
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.engine('.html', consolidate.swig);
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var routes = require('./routes/routes');
routes(app);


app.use(function(req, res) {
    res.render('notFound', { status: 404, url: req.url });
});



http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
