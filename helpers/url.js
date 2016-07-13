'use strict';

var env = require('./env')();

var Url = {};

Url.imageS3 = function(path) {
	var urls3 = 'https://s3-' + env.AwsRegion + '.amazonaws.com/' + env.AwsS3Bucket + '/' + env.appEnv + '/' + path;
	return urls3;
};

module.exports = Url;