var path = require('path');
var root = path.resolve();

var routename = require('./routename')();


module.exports = function(router) {
    "use strict";

    /**
     * Generate Grouping Routing, you can add additional options here.
     * @param  Object   options 
     * @param  Function cb      [description]
     * @return Express Router
     */
    var group = function(options, cb) {
        options = options || {};
        var method = '',
            callback = '',
            middleware = '';
        if (options.prefix && typeof options.prefix == "string") {
            cb(function route(o) {
                if (!o.url || typeof o.url !== "string") {
                    console.error("Group requires that the route url is a string.");
                    process.exit(1);
                }
                var route_link = options.prefix + o.url;
                if (!(o.method instanceof Array)) {
                    o.method = [o.method];
                }
                if (!(o.callback instanceof Array)) {
                    o.callback = [o.callback];
                }
                if (o.method.length === o.callback.length) {
                    var len = o.method.length;
                    for (var i = 0; i < len; i++) {
                        if ((o.callback[i] instanceof Function)) {
                            method = o.method[i];
                            callback = o.callback[i];
                            middleware = o.middleware;
                            if (options.middleware && options.middleware instanceof Function && middleware && middleware instanceof Function) {
                                router[method](route_link, [options.middleware, middleware], callback);
                            } else if (options.middleware && options.middleware instanceof Function && middleware && middleware instanceof Array) {
                                middleware.unshift(options.middleware);
                                router[method](route_link, middleware, callback);
                            } else if (options.middleware && options.middleware instanceof Function) {
                                router[method](route_link, options.middleware, callback);
                            } else if (middleware && middleware instanceof Function) {
                                router[method](route_link, middleware, callback);
                            } else if (middleware && middleware instanceof Array) {
                                router[method](route_link, middleware, callback);
                            } else {
                                router[method](route_link, callback);
                            }
                            if (o.name !== undefined) {
                                routename.setRoute(o.name, route_link);
                            }
                        } else {
                            console.error("route requires that the callback is a Function");
                            process.exit(1);                            
                        }
                    }
                }
            });
        } else {
            console.error("Options prefix is required and must be string.");
            process.exit(1);
        }
    };

    /**
     * Generate single routing, additional routing goes here.
     * @param  Object o 
     * @return Express Router
     */
    var single = function(o) {
        if (!o.url || typeof o.url !== "string") {
                    console.error("Group requires that the route url is a string.");
                    process.exit(1);
        }
        var route_link = o.url;
        if ((o.callback instanceof Function)) {
            var method = o.method;
            var callback = o.callback;
            var middleware = o.middleware;
            if (middleware && middleware instanceof Function) {
                router[method](route_link, middleware, callback);
            } else if (middleware && middleware instanceof Array) {
                router[method](route_link, middleware, callback);
            } else {
                router[method](route_link, callback);
            }
            if (o.name !== undefined) {
                routename.setRoute(o.name, route_link);
            }
        } else {
            console.error("route requires that the callback is a Function");
            process.exit(1);                            
        }
    };

    return {
        group: group,
        single: single
    };
};
