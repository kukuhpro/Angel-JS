'use strict';


class Routing {
	constructor(core) {
		this.core = core;
	}

	process(ArrayObject) {
		const length = ArrayObject.length;
		for (var i = 0; i < length; i++) {
			for (var key in ArrayObject[i]) {
				if (key !== 'group') {
					this.methodRouter(key, ArrayObject[i][key]);
				} else {
					this.groupRouter(ArrayObject[i][key]);
				}
			}	
		}
		this.core.app.use(this.core.router);
		return this.core;
	}

	groupRouter(obj) {
		if (!obj.options || !obj.methods) {
			this.core.debug("group required options and methods object");
			console.log("group required options and methods object");
			process.exit(1);
		}
		let urlPrefix = '';
		if (obj.options.prefix) {
			urlPrefix = obj.options.prefix;
		}
		let middlewares = [];
		if (obj.options.middleware) {
			middlewares = middlewares.concat(obj.options.middleware);
		}
		let folder = '';
		if (obj.options.folder) {
			folder = obj.options.folder;
		}

		const methodLength = obj.methods.length;
		for (var i = 0; i < methodLength; i++) {
			for (var k in obj.methods[i]) {
				var CombineMiddleware = middlewares;
				if (obj.methods[i][k].middleware) {
					CombineMiddleware = CombineMiddleware.concat(obj.methods[i][k].middleware);
				}
				const newObjectMethods = {
					url: urlPrefix + obj.methods[i][k].url,
					as: obj.methods[i][k].as,
					middleware: CombineMiddleware,
					uses: obj.methods[i][k].uses,
					validation: obj.methods[i][k].validation,
					folder: folder
				};
				this.methodRouter(k, newObjectMethods);
			}
		}
	}


	methodRouter(methodName, obj) {
		if (!obj.url || typeof obj.url !== "string") {
			console.log('Method ' + methodName + ' need url and it has to be string');
			process.exit(1)
		}
		if (obj.as) {
			this.core.routename.setRoute(obj.as, obj.url);
		}
		
		let middleware = (obj.middleware) ? obj.middleware : [];

		if (!(~obj.uses.indexOf('@'))) {
			console.log('options uses must have @, for example home@index');
			process.exit(1);
		}

		let split = obj.uses.split("@");

		if (!split[1]) {
			console.log('options uses must have @, for example home@index');
			process.exit(1);
		}

		let method = split[1];
		obj.uses = obj.uses.replace("@" + method, "");
		middleware = this.core.callingmiddleware(middleware);
		
		if (obj.validation) {
			middleware = this.core.validationservice.handle(middleware, obj.validation);
		}

		const callingController = (obj.folder) ? obj.folder + '/' + obj.uses : obj.uses;
		this.core.router[methodName](obj.url, middleware, (req, res, next) => {
			const requireController = require(this.core.root + '/app/controllers/' + callingController);
			const controller = new requireController();
			controller.loadFromCore(this.core);
			return controller.handleExpression(req, res, next, method);
		});
	}
}

module.exports = Routing;