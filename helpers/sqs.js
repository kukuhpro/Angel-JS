var AWS = require('aws-sdk');
var env = require('./env')();

var options = {
	endpoint: env.AwsSqsEndpoint,
	accessKeyId: env.AwsKey,
	secretAccessKey: env.AwsSecret,
	region: env.AwsRegion
};
var sqs = new AWS.SQS(options);

module.exports = sqs;