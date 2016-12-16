'use strict';

var root         = require('path').resolve();
var Middleware = require(root + '/helpers/cores/Angel/Middleware');

class authislogin extends Middleware {
	constructor() {
		super();
	}

	handle() {
		// if user is authenticated in the session, carry on 
	    if (this.req.isAuthenticated()) {
	        return this.next();
	    } else {
	        // if they aren't redirect them to the home page
	        return this.res.redirect(this.url.route('angelsite'));
	    }
	}
}


module.exports = authislogin;