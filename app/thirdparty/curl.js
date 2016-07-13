'use strict';

var request = require('request');

var curl = function() {
	var obj = this;
	curl.prototype.send = function(options, callback) {
		obj.callback = callback;
		request(options, this.handleSend);
	};

	curl.prototype.handleSend = function (error, response, body) {
		if (error) {
			console.log('ERROR >>> ' + error);
			obj.callback(error, null);
		} else {
			var data = {
				httpStatus: response.statusCode,
				body: body !== '' ? JSON.parse(body) : null
			};
			console.log(data);
			obj.callback(null, data);
		}
	};
};

module.exports = curl;