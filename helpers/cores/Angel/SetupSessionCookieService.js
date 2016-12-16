'use strict';

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var RedisStore   = require('connect-redis')(session);
var flash        = require('req-flash');

class SetupSessionCookieService {
	constructor(core) {
		this.core = core;
		this.redisconfiguration = {
			host: this.core.env.redis_host,
			port: this.core.env.redis_port
		};
		this.maxAgeSession = new Date(Date.now() + 3600000);
		return this.init();
	}

	init() {
		this.core.app.use(cookieParser());
		// Setting up session
		this.core.app.use(session({
		    store: new RedisStore(this.redisconfiguration),
		    secret: this.core.env.appKey,
		    resave: false,
		    saveUninitialized: false,
		    maxAge: this.maxAgeSession,
		    cookie: {
		        maxAge: this.maxAgeSession
		    }
		}));

		// setup flash session or cookie
		this.core.app.use(flash({
		    locals: 'flash'
		}));

		this.setupCache();
		return this.core;
	}

	setupCache() {
		const CacheSevices = require(this.core.core_path + '/cores/Angel/cache/CacheServices');
		this.core = new CacheSevices(this.core);
	}
}

module.exports = SetupSessionCookieService;