/* jslint node: true */
"use strict";

var env          = require('./helpers/env')();

if (env.appEnv   != 'local') {
    require('newrelic');
}
var debug        = require('debug')('etalastic:application');
var debug_api    = require('debug')('etalastic:api');
var aws          = require('aws-sdk');
var express      = require('express');
var errorhandler = require('errorhandler');
var flash        = require('req-flash');
var app          = express();
var ev           = require('express-validation');
var passport     = require('passport');
var path         = require('path');
var root         = require('path').resolve();
var fs           = require('fs');
var mkdirp       = require('mkdirp');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var subdomain    = require('subdomain');
var session      = require('express-session');
var RedisStore   = require('connect-redis')(session);
// var _         = require("underscore");
var fsr          = require('file-stream-rotator');
var Utils        = require('./helpers/utils');

// var models    = require('./helpers/models');
var multer       = require('multer'); // v1.0.5
var MulterS3     = require('multer-s3');

var ApiResponse  = require('./app/helpers/ApiResponse');
var EjsLocal     = require('ejs-locals');
// var ejs       = require('ejs');

/**
 * Express Init
 */

// view engine setup
app.set('x-powered-by', false);
app.set('superSecret', env.appKey);
app.set('views', path.join(__dirname, './app/views'));
app.engine('ejs', EjsLocal);
app.set('view engine', 'ejs');
// app.set('view engine', 'hjs');
// app.set('layout', 'layout');
if (env.appEnv == 'production') {
    app.enable('view cache');
}

// Set base URL for assets link
app.locals.baseURL = env.baseUrl;


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './public', 'favicon.png')));

/**
 * ACCESS LOG SHOULD BE DISABLED
 * ON PRODUCTION ENVIRONMENT
 */
if (env.appEnv != 'production') {
    // Logging change to daily
    var logDirectory = __dirname + '/storage/logs';
    // ensure log directory exists
    var logDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    // create a rotating write stream
    var accessLogStream = fsr.getStream({
        date_format: 'YYYY-MM-DD',
        filename: logDirectory + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false
    });
    app.use(logger('combined', {
        stream: accessLogStream
    }));
}

var redisOptions = {
    host: env.redis_host,
    port: env.redis_port
};

app.use(cookieParser());
// Setting up session
app.use(session({
    store: new RedisStore(redisOptions),
    secret: env.appKey,
    resave: false,
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 3600000),
    cookie: {
        maxAge: new Date(Date.now() + 3600000)
    }
}));
// Passport Init
app.use(passport.initialize());
app.use(passport.session());
require('./helpers/passport')(app, passport);


app.use(flash({
    locals: 'flash'
}));


// app.use(express.static(path.join(__dirname + 'public')));
app.use(express.static('public'));
app.use(errorhandler({
    log: errorNotification
}));

function errorNotification(err, str, req, res) {
    var title = 'Error in ' + req.method + ' ' + req.url;

    if (env.appEnv === 'development' || env.appEnv === 'local') {
        debug(err.trace);
    }

    if (path.indexOf("api") >= 0) {
        res.status(err.status || 500)
            .send({
                message: "Internal server error",
                error: err.status || {}
            });            
        debug_api(title + " >> " + str);
    } else {
        if (env.appEnv == 'local' || env.appEnv == 'development') {
            res.status(err.status || 500)
                .render('error/error', { title: 'Error in ' + req.method + ' ' + req.url, message: err.message, trace: err.stack });
        } else {
            debug(title + " >> " + str);
        }
    }

}


// Setting app express to subdomain read
app.use(subdomain({
    base: env.baseUrl,
    removeWWW: true,
    debug: env.appEnv == 'local' || env.appEnv == 'development'
}));


app.use(function(req, res, next) {
    app.locals.protocol = req.protocol;
    var urlText = req.url;
    var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
    if (rt !== null) {
        app.locals.subdomain = rt[1];
    }
    next();
});


var s3 = new aws.S3({
    accessKeyId: env.AwsKey,
    secretAccessKey: env.AwsSecret,
    region: env.AwsRegion
});

var storage = {};
if (env.diskStorage == 's3') {
    // S3 Storage
    storage = MulterS3({
        s3: s3,
        bucket: env.AwsS3Bucket,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: function(req, file, cb) {
            var urlText = req.url;
            var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
            var filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
            file.filename = filename;
            file.dir = rt[1] + '/' + filename;
            req.files = file;
            cb(null, env.appEnv + '/' + file.dir);
        }
    });
}
else {
    // Local Disk Storage
    storage = multer.diskStorage({
        destination: function(req, file, callback) {
            var urlText = req.url;
            var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
            var dir = './public/uploads/' + rt[1];
            mkdirp(root + '/public/uploads/' + rt[1], function(err) {
                if (err) {
                    debug(err.trace);
                }
                else {
                    callback(null, dir);
                }
            });
        },
        filename: function(req, file, callback) {
            var urlText = req.url;
            var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
            var filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
            file.filename = filename;
            file.dir = rt[1] + '/' + filename;
            req.files = file;
            callback(null, filename);
        }
    });
}


// var storage = multer.memoryStorage();

app.use(multer({
    storage: storage
}).any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());


// Setting Up Routes
// Load All Routes in folder app/routes
var routes_path = __dirname + '/app/routes';
fs.readdirSync(routes_path).forEach(function (file) {
  if (~file.indexOf('.js')) app.use(require(routes_path + '/' + file));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace

app.use(function(err, req, res, next) {
    var path = req.path;
    /**
     * this will handle error validation request only.
     * @param JSON err instanceof ev.ValidationError check if error is 
     * cause by validation error
     * @return JSON response 
     */
    if (err instanceof ev.ValidationError) {
        if (path.indexOf("api") >= 0) {
            var response = new ApiResponse();
            Utils.processError(err.errors, function(data) {
                response.setStatus(2);
                response.setData({
                    errors: {
                        messages: data
                    }
                });
                res.setHeader("Content-Type", "application/json");
                return res.status(422).json(response.getAll());
            });
        }
        else {
            var backUrl = req.app.locals.PreviousUrl;
            var errors = err.errors;
            for (var i = 0; i < errors.length; i++) {
                for (var x = 0; x < errors[i].messages.length; x++) {
                    errors[i].messages[x] = errors[i].messages[x].replace("_", " ");
                }
            }
            req.flash('errors', errors);
            return res.redirect(backUrl);
        }
    }
    else {
        if (env.appEnv === 'development' || env.appEnv === 'local') {
            debug(err.trace);
        }
        if (path.indexOf("api") >= 0) {
            var title = 'Error in ' + req.method + ' ' + req.url;
            res.status(err.status || 500)
                .send({
                    message: "Internal server error",
                    error: err.status || {}
                });
            debug(title + " >> " + err.message);
        }
        else {
            if (env.appEnv === 'development' || env.appEnv === 'local') {
                res.status(err.status || 500)
                    .render('error/error', { title: 'Error in ' + req.method + ' ' + req.url, message: err.message, trace: err.stack });
            } else {
                res.status(err.status || 500)
                    .send(err.message || 'Internal Server Error');
            }
        }
    }
});


module.exports = app;
