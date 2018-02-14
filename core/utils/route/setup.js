const express = require('express')
const routename = require('./routename')

/**
 * Class for setting up application route
 * @class setup
 */
class setup {
    /**
     * Creates an instance of setup.
     * @param {core class} core
     *
     * @memberOf setup
     */
    constructor(core) {
        this.core = core
        this.routename = routename(this.core)
        this.router = express.Router()
    }

    make(key, obj) {
        this[key] = obj
    }

    /**
     * all process for read array of object routes
     *
     * @param {array} arrayOfRoutes
     * @returns
     *
     * @memberOf setup
     */
    process(arrayOfRoutes) {
        // create helper for routing name and put in locals application
        this.core.app.locals.URL = this.routename.helperurl

        // length of array of routes
        const length = arrayOfRoutes.length
        // loop aray of routes based on his length
        for (var index = 0; index < length; index++) {
            var element = arrayOfRoutes[index];
            this.methodRouter(element.method, element)
        }

        // make express app using what we already declare for routing.
        this
            .core
            .app
            .use(this.router)

        return this.core
    }

    /**
     * Will handle registration process to router express.
     *
     * @param {string} methodName
     * @param {object} obj
     *
     * @memberOf setup
     */
    methodRouter(methodName, obj) {
        // set middleware if there is no object on milddeware then just set to empty
        // array
        let middleware = (obj.middleware)
            ? obj.middleware
            : []
        if (typeof middleware !== 'object') {
            console.log('middleware must be an array|object')
            process.exit(1)
        }

        // convert of array string to object middleware than express js can read those
        middleware = this
            .middlewareSetup
            .process(middleware)

        if (obj.validation) {
            const requestMiddleware = this
                .validationSetup
                .handle(obj.validation)

            middleware = middleware.concat(requestMiddleware)
        }

        // check object url is not string
        if (!obj.url || typeof obj.url !== "string") {
            console.log('Method ' + methodName + ' need url and it has to be string')
            process.exit(1)
        }

        if (!obj.uses) {
            console.log("routing must have uses parameters")
            process.exit(1)
        }

        // check if object uses has handle '@' string
        if (!(~ obj.uses.indexOf('@'))) {
            console.log('options uses must have @, for example home@index')
            process.exit(1)
        }
        // split those string based on '@' character
        let split = obj
            .uses
            .split("@")

        if (!split[1]) {
            console.log('options uses must have @, for example home@index')
            process.exit(1)
        }

        const method = split[1]
        const callingController = split[0]

        if (obj.as) {
            this
                .routename
                .setRoute(obj.as, obj.url)
        }

        //  setup router for express route
        this.router[methodName](obj.url, middleware, (req, res, next) => {
            const requireController = require(this.core.controllerPath + callingController)
            const controller = new requireController()
            controller.setupSomeHelper(this.core)
            return controller.handle(req, res, next, method)
        })
    }
}

module.exports = setup