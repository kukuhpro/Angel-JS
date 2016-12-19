'use strict';

var Routing = require('./Routing');
var MiddlewareService = require('../kernel/MiddlewareService');
var fs      = require('fs');

class RouteControllerService {
	constructor(core) {
		this.core = core;
		this.core = new MiddlewareService(this.core);
		this.RouteName = require(this.core.root + '/helpers/routename')();
		this.core = this.core.make('routename', this.RouteName);
		this.routesPath = this.core.root + '/app/routes';
		this.routing = new Routing(this.core);
		return this.init();
	}

	init() {
		fs.readdirSync(this.routesPath).forEach(function (file) {
		  if (~file.indexOf('.js')) {
		  	const ArrayObject = require(this.core.root + '/app/routes/' + file);
			this.core = this.routing.process(ArrayObject);
		  }
		}.bind(this));
		return this.core;
	}
}

module.exports = RouteControllerService;