var express   = require('express');
var app       = express();

var path = require('path');
var root = path.resolve();
var env = require(root + '/helpers/env')();

var routename = function () {
	var setRoute = function(routename, url) {
		var objectRouteName = app.locals.AllRouteName;
		if (objectRouteName === undefined) {
			app.locals.AllRouteName = {};
			app.locals.AllRouteName[routename] = url;
		} else {
			objectRouteName[routename] = url;
			app.locals.AllRouteName = objectRouteName;
		}
	};

	var helperurl = {
		route: function(routename) {
			var objectRouteName = app.locals.AllRouteName;
			return objectRouteName[routename];
		},
		to: function(url) {
			return 'http://' + env.baseUrl + '/' + url;
		}
	}

	return {
		setRoute: setRoute,
		helperurl: helperurl
	}
};

module.exports = routename;