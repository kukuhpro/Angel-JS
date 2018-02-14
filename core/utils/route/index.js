const Route = require('./route')
const Setup = require('./setup')
const fs = require('fs')
const middlewareSetup = require('../middleware/setup')
const requestSetup = require('../request/setup')
const listRoutes = require('./listroutes')

/**
 * @class setupRoute
 */
class setupRoute {
    /**
     * Creates an instance of setupRoute.
     * @param {core class} core
     *
     * @memberOf setupRoute
     */
    constructor(core) {
        // setup core to this class
        this.core = core

        // setup local variable for csrf token in every view page
        this.core.app.locals.csrfToken = ""

        // set route path folder for all of the routes
        this.routesPath = this.core.rootPath + '/app/routes'
        // setup class is to process read all those routes object
        this.setup = new Setup(this.core)

        this
            .setup
            .make('middlewareSetup', new middlewareSetup(this.core))

        // setup for setting up validation midddleware
        this
            .setup
            .make('validationSetup', new requestSetup(this.core))

        // set array of routes to empty first
        this.arrayOfRoutes = Array.from([])

        return this.init()
    }

    /**
     * Process for all logic to generate routing based on file route
     * @returns {core class} this.core
     *
     * @memberOf setupRoute
     */
    init() {
        // looping those files on folder routes, because all those route file is set to
        // one folder.
        fs
            .readdirSync(this.routesPath)
            .forEach(function (file) {
                // check file id is extension of javascrip extension
                if (~ file.indexOf('.js')) {
                    // get those file route
                    const fileRoute = require(this.core.routePath + file)

                    let objListRoutes = new listRoutes(fileRoute)
                    objListRoutes.setStartRoutes()
                    objListRoutes.setEndRoutes()

                    // put every route into array of routes
                    this.arrayOfRoutes = this
                        .arrayOfRoutes
                        .concat(objListRoutes.getEndRoutes())
                }
            }.bind(this))
            
        return this
            .setup
            .process(this.arrayOfRoutes)
    }
}

module.exports = setupRoute