'use strict';

var path         = require('path');
var root         = path.resolve();
var http 		 = require('http');

var Core = require('./Angel/Core');
var StorageSetupConfiguration = require('./Angel/storage/StorageSetupConfiguration');

class Angel {

	constructor() {
		this.core = new Core();
		this.debug = require('debug')(this.core.env.appName + ':server');
		this.baseSetting = Array.from([
			'SetGlobalHelperFunction',
			'SetupSessionCookieService',
			'SetViewEngineSetup',
			'redis/RedisService',
			'route/RouteControllerService',
			'mail/MailService',
			'SetupLogService',
			'SetupHandleErrorService'
		]);
	}

	run() {
		this.core = new StorageSetupConfiguration(this.core);
		this.baseSetting.forEach(function(value) {
			const ClassRequire = require('./Angel/' + value);
			this.core = new ClassRequire(this.core);
		}.bind(this));
	}

	server() {
		this.port = this.core.utils.normalizePort(this.core.env.runningPort || '3000');
		this.core.app.set('port', this.port);
		this.core.make('server', http.createServer(this.core.app));
		this.core.server.listen(this.port);
		this.core.server.on('error', (error) => {
			this.onError(error);
		});
		this.core.server.on('listening', () => {
			this.onListening();
		});
	}

	/**
	 * Event listener for HTTP server "listening" event.
	 */

	onListening() {
	  var addr = this.core.server.address();
	  var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	  console.log('Listening on ' + bind);
	}

	/**
	 * Event listener for HTTP server "error" event.
	 */
	onError(error) {
	  if (error.syscall !== 'listen') {
	    throw error;
	  }

	  var bind = typeof port === 'string'
	    ? 'Pipe ' + port
	    : 'Port ' + port;

	  // handle specific listen errors with friendly messages
	  switch (error.code) {
	    case 'EACCES':
	      console.error(bind + ' requires elevated privileges');
	      process.exit(1);
	      break;
	    case 'EADDRINUSE':
	      console.error(bind + ' is already in use');
	      process.exit(1);
	      break;
	    default:
	      throw error;
	  }
	}
}

module.exports = Angel