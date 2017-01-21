'use strict'
const root         = require('path').resolve()
const Request      = require(root + '/helpers/cores/Angel/Request')

const Joi          = require('joi')

class LoginRequest extends Request {
	constructor() {
		super()
	}

	rules() {
		return {
			username: Joi.string().required(),
			email: Joi.string().email().required()
		}
	}
}


module.exports = LoginRequest;


