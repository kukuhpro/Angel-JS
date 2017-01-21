'use strict';

class Controller {
	/**
	 * Register All function or method helper for support controllers
	 * @void
	 */
	register() {
		this.url = this.req.app.locals.URL;
		this.subdomainName = this.req.domain;
		if (this.req.method == 'GET') {
			this.req.app.locals.previousurl = this.req.app.locals.currenturl;				
			this.req.app.locals.currenturl = this.req.route.path;
		}	
	}

	/**
	 * load any helper or function from core that will be usefull for controller helper;
	 * @void
	 */
	loadFromCore(core) {
		this.mailsend = core.mailsend;
		this.env = core.env;
		this.redisclient = core.redisclient;
		this.cache = core.cache;
	}

	back() {
		return this.res.redirect(this.req.app.locals.currenturl);
	}
	
	handleExpression(req, res, next, method) {

		this.req = req;
		this.res = res;
		this.next = next;

		this.register();

		return this[method]();
	}
}

module.exports = Controller;