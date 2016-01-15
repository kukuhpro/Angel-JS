"use strict";

var env          = require('../helpers/env')();
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('../app/routes');
var subdomain    = require('subdomain');
var session      = require('express-session');
var _            = require("underscore");

module.exports = function (app, express) {
	var ejsLocal = require('ejs-locals');

	app.engine('ejs', ejsLocal);

	// view engine setup
	app.set('views', path.join(__dirname, '../app/views'));
	app.set('view engine', 'ejs');

	// uncomment after placing your favicon in /public
	app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	// Setting up session
	app.use(session({secret: 'ssshhhhh'}));
	// app.use(express.static(path.join(__dirname + 'public')));
	app.use(express.static('public'));

	// Setting app express to subdomain read
	app.use(subdomain({ base : env.baseUrl, removeWWW : true }));

	// Setting up routes
	app.use('/', routes);
};