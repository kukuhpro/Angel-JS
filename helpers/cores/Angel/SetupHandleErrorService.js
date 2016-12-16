'use strict';

var errorhandler = require('errorhandler');
var ev           = require('express-validation');

class SetupHandleErrorService {
	constructor(core) {
		this.core = core;
		this.debug = this.core.debug;
		this.debug_api    = this.core.debug_api;
		return this.init();
	}

	init() {
		this.core.app.use(errorhandler({
		    log: (err, str, req, res) => {
		    	this.errorNotification(err, str, req, res);
		    }
		}));

		// catch 404 and forward to error handler
		this.core.app.use(function(req, res, next) {
		    var err = new Error('Not Found');
		    err.status = 404;
		    next(err);
		});
		this.handlingErrors();
		return this.core;
	}

	handlingErrors() {
		this.core.app.use(function(err, req, res, next) {
		    var path = req.path;
		    /**
		     * this will handle error validation request only.
		     * @param JSON err instanceof ev.ValidationError check if error is 
		     * cause by validation error
		     * @return JSON response 
		     */
		    if (err instanceof ev.ValidationError) {
		        if (path.indexOf("api") >= 0) {
		            var response = this.core.apiresponse;
		            this.core.utils.processError(err.errors, function(data) {
		                response.setStatus(2);
		                response.setData({
		                    errors: {
		                        messages: data
		                    }
		                });
		                res.setHeader("Content-Type", "application/json");
		                return res.status(422).json(response.getAll());
		            });
		        }
		        else {
		            var errors = err.errors;
		            for (var i = 0; i < errors.length; i++) {
		                for (var x = 0; x < errors[i].messages.length; x++) {
		                    errors[i].messages[x] = errors[i].messages[x].replace("_", " ");
		                }
		            }
		            req.flash('errors', errors);
		            return res.json(errors);
		        }
		    }
		    else {
		        if (this.core.env.appEnv === 'development' || this.core.env.appEnv === 'local') {
		            this.debug(err.trace);
		        }
		        if (path.indexOf("api") >= 0) {
		            var title = 'Error in ' + req.method + ' ' + req.url;
		            res.status(err.status || 500)
		                .send({
		                    message: "Internal server error",
		                    error: err.status || {}
		                });
		            this.debug(title + " >> " + err.message);
		        }
		        else {
		            if (this.core.env.appEnv === 'development' || this.core.env.appEnv === 'local') {
		                res.status(err.status || 500)
		                    .render('error/error', { title: 'Error in ' + req.method + ' ' + req.url, message: err.message, trace: err.stack });
		            } else {
		                res.status(err.status || 500)
		                    .send(err.message || 'Internal Server Error');
		            }
		        }
		    }
		}.bind(this));
	} 

	errorNotification(err, str, req, res) {
	    var title = 'Error in ' + req.method + ' ' + req.url;
	    let path = req.path;

	    if (this.core.env.appEnv === 'development' || this.core.env.appEnv === 'local') {
	        this.debug(err.trace);
	    }

	    if (path.indexOf("api") >= 0) {
	        res.status(err.status || 500)
	            .send({
	                message: "Internal server error",
	                error: err.status || {}
	            });            
	        this.debug_api(title + " >> " + str);
	    } else {
	        if (this.core.env.appEnv == 'local' || this.core.env.appEnv == 'development') {
	            res.status(err.status || 500)
	                .render('error/error', { title: 'Error in ' + req.method + ' ' + req.url, message: err.message, trace: err.stack });
	        } else {
	            this.debug(title + " >> " + str);
	        }
	    }
	}
}


module.exports = SetupHandleErrorService;