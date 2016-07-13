'use strict';

var path = require('path');
var root = path.resolve();

var Site = require('./site');
var Home = Object.create(Site);

Home.index = function(req, res, next) {
	return res.render('index', Home.template);
};

module.exports = Home;