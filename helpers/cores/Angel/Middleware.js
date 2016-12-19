'use strict';

class Middleware {
	constructor() {
	}

	handleExpression(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;

		return this.handle();
	}
}

module.exports = Middleware;