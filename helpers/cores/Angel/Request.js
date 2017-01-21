'use strict'

const Core = require('./Core');

class Request {
	constructor() {
		this.core = new Core();
	}

	/**
	 * Function for handling error if validation failed, 
	 * Replace this function of want to change return value of errors;
	 */
	handleerror(err) {
		this.req.errors = err;
		const redirectUrl = this.req.app.locals.currenturl;
		if (redirectUrl) {
			return this.res.redirect(redirectUrl + '?' + this.core.objectourl(err));
		} else {
			return this.res.redirect(this.req.originalUrl + '?' + this.core.objectourl(err));
		}
	}

	handlesuccess(value) {
		return this.next();
	}

	handleExpression(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;

		let input = Object.assign(req.body, req.query);

		this.core.validationservice.make(input, this.rules(), (err, values) => {
			if (err) {
				this.handleerror(err);
			} else {
				this.handlesuccess(values);
			}
		});
	}
}


module.exports = Request;