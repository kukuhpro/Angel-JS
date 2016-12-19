'use strict';

class MiddlewareService  {
	constructor(core) {
		this.core = core;
		this.app_path = this.core.app_path;
		const KernelRequire = require(this.app_path + '/middlewares/kernel');
		this.kernel = new KernelRequire();
		this.middlewaresArrayObject = {};

		return this.register();
	}

	register() {
		const routesMiddlewares =  this.kernel.routeMiddleware;
		for (var middleware in routesMiddlewares) {
			const middlewareRequire = require(this.core.app_path + '/' + routesMiddlewares[middleware]);
			this.middlewaresArrayObject[middleware] = middlewareRequire;
		}
		this.core.make('middlewarearrayobject', this.middlewaresArrayObject);
		this.core.make('callingmiddleware', (aliasMiddleware) => {
			return this.callingMiddleware(aliasMiddleware);
		});
		return this.core;
	}


	callingMiddleware(middlewares) {
		let newHandleMiddleware = [];
		if (middlewares instanceof Array) {
			for (var i = 0; i < middlewares.length; i++) {
				const middlewareClass = this.core.middlewarearrayobject[middlewares[i]];
				const middleware = new middlewareClass();
				newHandleMiddleware.push(function(req, res, next) {
					middleware.handleExpression(req, res, next);
				}.bind(this));
			}
			return newHandleMiddleware;
		} else {
			const middlewareClass = this.core.middlewarearrayobject[middlewares];
			const middleware = new middlewareClass();
			newHandleMiddleware.push(function(req, res, next) {
				middleware.handleExpression(req, res, next);
			}.bind(this));

			return newHandleMiddleware;
		}	
	}
}

module.exports = MiddlewareService;