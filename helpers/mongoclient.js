'use strict';

var MongoClient = require('mongodb').MongoClient;

var env  = require('./env');
var sync = require('synchronize');

var mongoclient = function(subdomain) {
	this.subdomain =  subdomain;
	this.env       = env(subdomain);
	var obj        = this;

	mongoclient.prototype.handleConnect = function(err, db) {
		obj.callback(null, db);
	};

	mongoclient.prototype.connect = function(callback) {
		obj.callback = callback;
		var Url = 'mongodb://' + obj.env.db.user + ':' + obj.env.db.password + '@' + obj.env.db.host + ':' + obj.env.db.port + '/' + obj.env.db.database + '?authSource=' + obj.env.db.database;
		var db = MongoClient.connect(Url, this.handleConnect);
	};

	mongoclient.prototype.handleError = function(err) {
		console.log('ERROR >>> ' + err);
		obj.callback(err, null);
	};
};


module.exports = mongoclient;
