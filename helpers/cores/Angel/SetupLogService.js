'use strict';

var fs = require('fs');
var fsr = require('file-stream-rotator');
var logger       = require('morgan');

class SetupLogService  {
	constructor(core) {
		this.core = core;
		return this.init();
	}

	init() {
		if (this.core.env.appEnv != 'production') {
		    // Logging change to daily
		    var logDirectory = this.core.root + '/storage/logs';
		    // ensure log directory exists
		    var logDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

		    // create a rotating write stream
		    var accessLogStream = fsr.getStream({
		        date_format: 'YYYY-MM-DD',
		        filename: logDirectory + '/access-%DATE%.log',
		        frequency: 'daily',
		        verbose: false
		    });
		    this.core.app.use(logger('combined', {
		        stream: accessLogStream
		    }));
		}

		return this.core;
	}
}

module.exports = SetupLogService;