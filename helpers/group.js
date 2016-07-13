module.exports = function(router) {
    "use strict";
    var routing = function(options, cb) {
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
    return {
        routing: routing
    };
};
