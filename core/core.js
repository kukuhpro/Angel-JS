require('dotenv').config()
const express = require('express')
const path = require('path')
const rootPath = path.resolve()

/**
 * this class will working as a dependecy injection class
 * @class core
 */
class core {
    constructor() {
        // set singleton class pattern
        if (!core.instances) {
            core.instances = this
            this.app = express()
            this.env = process.env

            // path setup
            this.rootPath = rootPath
            this.applicationPath = this.rootPath + '/app/'
            this.routePath = this.rootPath + '/app/routes/'
            this.controllerPath = this.rootPath + '/app/controllers/'
            this.middlewaresPath = this.rootPath + '/app/middlewares/'
            this.requestPath = this.rootPath + '/app/requests/'

            // setup local application helper variable
            this.app.locals.AllRouteName = {}

            // this for setup an error on the layout html
            this.app.locals.errors = []
        }
        return core.instances
    }

    // make object based
    make(key, obj) {
        this[key] = obj
    }
}

module.exports = core