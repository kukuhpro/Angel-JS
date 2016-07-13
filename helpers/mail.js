/* jslint node: true */
"use strict";
var AWS = require('aws-sdk');
var env = require('./env')();
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var EmailTemplate = require('email-templates').EmailTemplate;

var ses = new AWS.SES({
    accessKeyId: env.AwsKey,
    secretAccessKey: env.AwsSecret,
    region: 'us-east-1',
    apiVersion: '2010-12-01',
    signatureVersion: 'v4'
});
var configs = {
    ses: ses
};

var transport = nodemailer.createTransport(sesTransport(configs));

/**
 * Mail Helper for sending use AWS Ses
 * @param {[type]}   obj      {templatePath},{data},{from},{to},{subject}
 * @param {Function} callback 
 */
var Mail = function(obj, callback) {
    var template = new EmailTemplate(obj.templatePath);
    new Promise((resolve, reject) => {
        template.render(obj.data, function(err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    }).then(handleTemplate).catch(handleError);

    function handleEmail(info) {
        callback(null, info);
    };

    function handleTemplate(results) {
        new Promise((resolve, reject) => {
            var mailOptions = {
                from: obj.from,
                to: obj.to,
                subject: obj.subject,
                html: results.html
            };
            transport.sendMail(mailOptions, function(error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        }).then(handleEmail).catch(handleError);
    };

    function handleError(err) {
        console.log('ERROR >>>> ' + err);
        callback(err, null);
    };
};

module.exports = Mail;
