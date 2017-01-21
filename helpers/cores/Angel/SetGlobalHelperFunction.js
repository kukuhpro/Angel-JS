'use strict';

var favicon = require('serve-favicon');
var subdomain    = require('subdomain');

class setGlobalHelperFunction {
	constructor(core) {	
		this.core = core;
		this.core.make('core_path', this.core.root + '/helpers');
		this.core.make('app_path', this.core.root + '/app');
		this.core.app.locals.languange = 'en';
		this.RouteName = require(this.core.core_path + '/routename')();
		let localization = require(this.core.core_path + '/localization');
		this.localization = new localization(this.core.app.locals.languange);
		this.core = this.core.make('routename', this.RouteName);
		this.core = this.core.make('objectourl', function(obj) {
			var str = "";
			for (var key in obj) {
			    if (str != "") {
			        str += "&";
			    }
			    str += key + "=" + obj[key];
			}
			return str;
		});

		return this.init();
	}

	init() {
		this.core.app.locals.baseURL = this.core.env.baseUrl;
		this.core.app.locals.URL = this.RouteName.helperurl;
		this.core.app.locals.langGet = this.localization.get;
		this.core.app.use(favicon(this.core.path.join(this.core.root, './public', 'favicon.png')));

		// Setting app express to subdomain read
		this.core.app.use(subdomain({
		    base: this.core.env.baseUrl,
		    removeWWW: true,
		    debug: this.core.env.appEnv == 'local' || this.core.env.appEnv == 'development'
		}));

		this.core.app.use(function(req, res, next) {
		    this.core.app.locals.protocol = req.protocol;
		    var urlText = req.url;
		    var rt = urlText.match(/\/subdomain\/(\w+)\/.*/);
		    if (rt !== null) {
		        this.core.app.locals.subdomain = rt[1];
		    }
		    this.core.app.locals.req = req;
		    next();
		}.bind(this));

		return this.core;
	}
}

module.exports = setGlobalHelperFunction;