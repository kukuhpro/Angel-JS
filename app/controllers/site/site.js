'use strict';

var path   = require('path');
var root   = path.resolve();
var jwt    = require('jsonwebtoken');
var moment = require('moment');

var template = require(root + '/config/template');

var Site = {
	template: template,
	// Do Anything in Parent Controller
};

module.exports = Site;