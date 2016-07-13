/* jslint node: true */
"use strict";

var path = require('path');
var root = path.resolve();
var env = require(root + '/helpers/env')();

var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');
if (env.cacheDriver == "redis") {
    var config = require(root + '/config/redis');
    config.store = redisStore;
} else {
    var config = require(root + '/config/cache');
}
var Cache = cacheManager.caching(config);

module.exports = Cache;
