"use strict";
module.exports = function(router) {
	var routing = function(options, cb) {
		options = options || {};
        if(options.prefix && typeof options.prefix == "string") {
        	cb(function route(o) {
        		if(!o.url || typeof o.url !== "string"){
	              console.log("Group requires that the route url is a string.");
	              process.exit(1);
            	}
            	var rute = options.prefix + o.url;
            	if((o.method instanceof Array) && (o.callback instanceof Array)) {
            		if(o.method.length === o.callback.length){
		                var len = o.method.length;
		                for(var i = 0; i < len; i++){
		                  if(!o.callback[i] instanceof Function){
		                    console.log("route requires that the callback is a Function");
		                    process.exit(1);
		                  }
		                  var method = o.method[i];
		                  var callback = o.callback[i];
		                  if(options.middleware && options.middleware instanceof Function){
		                    router[method](rute, options.middleware, callback);
		                  }else{
		                    router[method](rute, callback);
		                  }
		                }
		             }
            	} else {
            		if(!o.callback || !o.callback instanceof Function){
		                console.log("Group requires that the middleware is a Function");
		                process.exit(1);
		            }
		            var method = o.method || "get";
		            var callback = o.callback;
		            if(options.middleware && options.middleware instanceof Function){
		                router[method](rute, options.middleware, callback);
		            }else{
		                router[method](rute, callback);
		            }
            	}
        	});
        } else{
		    console.log("Options prefix is required and must be string.");
		    process.exit(1);
		}
	};
	return {
		routing: routing
	}
};