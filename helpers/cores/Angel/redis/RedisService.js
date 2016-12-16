'use strict';

var Redis = require('redis');


class RedisService {
	constructor(core) {
		this.core = core;
		this.redisConfig =  {
			host: this.core.env.redis_host,
			port: this.core.env.redis_port
		};

		this.redisclient = Redis.createClient(this.redisConfig);

		return this.register();
	}

	register() {
		this.core.make('redisclient', this.redisclient);

		return this.core;
	}
}

module.exports = RedisService;