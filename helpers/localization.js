'use strict';
var path = require('path');
var root = path.resolve();

var fs           = require('fs');
var Utils = require('./utils');

var localization = function(lang) {
	this.lang = lang;
	this.copy = {};

	// Require All files in resources/languange
	this.routes_path = root + '/resources/lang/' + lang;
	var obj = this;

	localization.prototype.handleReadDir = function(file) {
		var data = {};
		if (~file.indexOf('.json')) {
			var name = file.replace('.json', '')
			data[name] = require(obj.routes_path + '/' + file);
			obj.copy = Object.assign(obj.copy, data); // Combile all json file into one object
		}
	};

	localization.prototype.get = function(objectPath) {
		return Utils.splitNCallObject(obj.copy, objectPath)
	}

	fs.readdirSync(this.routes_path).forEach(this.handleReadDir);
};


module.exports = localization;