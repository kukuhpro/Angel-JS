'use strict';

var root         = require('path').resolve();
var Middleware = require(root + '/helpers/cores/Angel/Middleware');

class authisadmin extends Middleware {
	constructor() {
		super();
	}

	handle() {
		console.log("Hello i'm middleware for authenticate admin");
	    return this.next();
	}
}


module.exports = authisadmin;