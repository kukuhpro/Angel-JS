'use strict';

var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var co = require('co');

class Mail {
	constructor(core) {
		this.core = core;
		this.core.make('emailtemplate', EmailTemplate);

		return this.init();
	}

	init() {
		let transport = null;
		switch (this.core.env.email_driver) {
		  case "ses":
			    const ses = require('./ses');
			    this.core = new ses(this.core);
				transport = nodemailer.createTransport(this.core.AwsSesTransport);
				this.core.make('transport', transport);
		    break;
		  case "mandrill":
				const mandrill = require('./mandrill');
				this.core = new mandrill(this.core);
				transport = nodemailer.createTransport(this.core.MandrillTransport);
				this.core.make('transport', transport);
		    break;
		  default:
		    break;
		}

		return this.register();
	}

	register() {
		this.core.make('mailsend', (obj, callback) => {
			this.mailsend(obj, callback);
		});
		return this.core;
	}

	promiseEmailTemplate() {
		return new Promise((resolve, reject) => {
			this.EmailTemplate.render(this.data.data, function(err, results) {
	            if (err) {
	                reject(err);
	            } else {
	                resolve(results);
	            }
	        });
		});
	}

	mailsend(obj, callback) {
		this.data = obj;
		this.callback = callback;
		const templatePath = this.core.root + '/app/views/' + this.data.templatePath;
		const emailtemplate = this.core.emailtemplate;
		this.EmailTemplate = new emailtemplate(templatePath);

		this.process();
	}

	process() {
		co(function*() {
			const resultTemplate = yield this.promiseEmailTemplate();
			return resultTemplate.html;
		}.bind(this)).then((html) => {
			const configSendEmail = {
				from: this.data.from,
                to: this.data.to,
                subject: this.data.subject,
                html: html
			};
			this.core.transport.sendMail(configSendEmail, (err, info) => {
				this.callback(err, info);
			});
		}).catch((err) => {
			console.log(err);
			this.core.debug("Error Rendering template Email.");
			console.log('Error : template email rendering');
			this.callback(err, null);
		});
	}

}


module.exports = Mail;