'use strict';


class Kernel {
	constructor() {
		this.routeMiddleware = {
			"AuthIsLogin": "middlewares/authislogin",
			"AuthIsAdmin": "middlewares/authisadmin"
		};
	}
}

module.exports = Kernel;