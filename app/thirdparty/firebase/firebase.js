'use strict';

var path = require('path');
var root = path.resolve();

var env = require(root + '/helpers/env')();
var schema = require(root + '/helpers/models');

var firebase = {
	endPoint: 'https://fcm.googleapis.com/fcm/send',
	method: 'POST',
	env: null,
	headers: {},		
	subdomain: '',
	groupKey: '',
	schema: null,
	init: function(subdomain) {
		firebase.env       = env;
		var model          = schema.load('Tenant', subdomain);
		firebase.subdomain = subdomain;
		firebase.schema    = model;
		firebase.headers = {
			'Authorization': 'key=' + env.firebaseAuthKey,
			'Content-Type': 'application/json'
		};
		model.findOne({subdomain: subdomain}, firebase.handleTenant);
	},
	handleTenant: function(err, data) {
		if (err || data == null) {
			firebase.groupKey = '';
		} else {
			firebase.groupKey = data.groupKey;
		}
	}
};

module.exports = firebase;