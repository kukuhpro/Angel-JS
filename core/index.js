const core = require('./core')
const http = require('http')

class Application {
    /**
     * Creates an instance of Application.
     *
     * @memberOf Application
     */
    constructor() {
        this.core = new core()

        this.baseSetup = Array.from(['viewEngineSetup', 'sessionSetup', 'route'])
    }

    /**
     * This function is for setup all configuration and need for this application
     * @memberOf Application
     */
    run() {
        this
            .baseSetup
            .forEach((val) => {
                const classRequire = require('./utils/' + val)
                this.core = new classRequire(this.core)
            })
    }

    /**
     * Serve on application that already been configured to http server.
     * @memberOf Application
     */
    serve() {
        // setup port for express application that using based on config on .env file
        this
            .core
            .app
            .set('port', this.core.env.APP_PORT)
        // create server for http
        this
            .core
            .make('server', http.createServer(this.core.app))
        // listen those port for http server
        this
            .core
            .server
            .listen(this.core.env.APP_PORT)
        // make event handler listening when application is listen to those port
        this
            .core
            .server
            .on('listening', () => {
                this.onListening()
            })
    }

    /**
	 * Event listener for HTTP server "listening" event.
	 */
    onListening() {
        var addr = this
            .core
            .server
            .address()

        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port

        console.log('Listening on ' + bind);
    }
}

module.exports = Application