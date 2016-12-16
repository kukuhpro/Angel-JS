'use strict';

var aws = require('aws-sdk');

class awss3 {
	constructor(env) {
		this.env = env;
		return this.connection();
	}

	connection() {
		return new aws.S3({
		    accessKeyId: this.env.AwsKey,
		    secretAccessKey: this.env.AwsSecret,
		    region: this.env.AwsRegion
		});
	}
}

module.exports = awss3;