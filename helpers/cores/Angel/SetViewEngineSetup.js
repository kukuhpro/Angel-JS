'use strict';

var path         = require('path');
var root         = require('path').resolve();
var express      = require('express');

var EjsLocal     = require('ejs-locals');

class SetViewEngineSetup {
	constructor(core) {
		this.core = core;
		return this.init();
	}	

	init() {
		this.core.app.set('x-powered-by', false);
		this.core.app.set('superSecret', this.core.env.appKey);
		this.core.app.set('views', path.join(this.core.root, './app/views'));
		this.core.app.engine('ejs', EjsLocal);
		this.core.app.set('view engine', 'ejs');
		this.core.app.use(express.static(path.join(this.core.root, 'public')));

		if (this.core.env.appEnv == 'production') {
			this.core.app.enable('view cache');
		}

		return this.core;
	}
}

module.exports = SetViewEngineSetup;