'use strict';


class Kernel {
	constructor() {
		this.routeMiddleware = {
			'auth.is.login' => 'middlewares/authislogin'
		};
	}
}

module.exports = Kernel;