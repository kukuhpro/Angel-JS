'use strict';

var AWS = require('aws-sdk');
var sesTransport = require('nodemailer-ses-transport');

class Ses {
	constructor(core) {
		this.core = core;
		this.AwsSes = new AWS.SES({
		    accessKeyId: this.core.env.AwsKey,
		    secretAccessKey: this.core.env.AwsSecret,
		    region: 'us-east-1',
		    apiVersion: '2010-12-01',
		    signatureVersion: 'v4'
		});
		this.ConfigAwsSes= {
			ses: this.AwsSes
		};

		return this.register();
	}

	register() {
		const SesTransport = sesTransport(this.ConfigAwsSes);
		this.core.make('AwsSesTransport', SesTransport);
		return this.core;
	}


}


module.exports = Ses;