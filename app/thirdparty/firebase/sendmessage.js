'use strict';

var path                = require('path');
var root                = path.resolve();

var env                 = require(root + '/helpers/env')();

var curl                = require('../curl');
var firebase            = require('./firebase');

var sendMessageGroup    = Object.create(firebase);

sendMessageGroup.curl   = new curl();
sendMessageGroup.create = function(data, callback) {
	sendMessageGroup.callback = callback;
	var sendData = {
		to: data.notification_group_key,
		data: data.data
	};
	var options = {
		method: sendMessageGroup.method,
		url: sendMessageGroup.endPoint,
		headers: sendMessageGroup.headers,
	    body: JSON.stringify(sendData)
	};
	sendMessageGroup.curl.send(options, sendMessageGroup.handleRequest);
};

sendMessageGroup.handleRequest = function(err, body) {
	sendMessageGroup.callback(null, body);
};

module.exports = sendMessageGroup;