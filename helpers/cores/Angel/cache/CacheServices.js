'use strict';

var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');

class CacheServices {

	constructor(core) {
		this.core = core;
		this.redisConf = {
		    host: this.core.env.redis_host, // default value
		    port: this.core.env.redis_port, // default value
		    store: redisStore,
		    auth_pass: '',
		    db: 0,
		};
		return this.register();
	}

	register() {
		this.core.make('cache', cacheManager.caching(this.redisConf));
		return this.core;
	}
}



module.exports = CacheServices