'use strict'

const Joi = require('joi');

class ValidationService {
	constructor(core) {
		this.core = core;
		this.joi = Joi;
	}

	handle(middleware, requestName) {
		const RequireClass = require(this.core.app_path + '/requests/' + requestName);
		this.validationclass = new RequireClass();
		middleware.push(function(req, res, next) {
			this.validationclass.handleExpression(req, res, next);
		}.bind(this));

		return middleware;
	}

	make(input, rules, callback) {
		this.joi.validate(input, rules, (err, value) => {
			if (err) {
				callback(this.mappingErrors(err), null);
			} else {
				callback(null, value);
			}
		});		
	}

	mappingErrors(err) {
		const details = err.details;
		let newerr = {};
		for (var i = details.length - 1; i >= 0; i--) {
			newerr['error_' + details[i].path] = details[i].message;
		}

		return newerr;
	}
}

module.exports = ValidationService;