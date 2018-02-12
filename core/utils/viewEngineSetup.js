const expressNunjucks = require('express-nunjucks')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

/**
 * this class for handling any that related to view and body parser
 *
 * @class ViewEngineSetup
 */
class ViewEngineSetup {
    /**
     * Creates an instance of ViewEngineSetup.
     * @param {any} core
     *
     * @memberOf ViewEngineSetup
     */
    constructor(core) {
        this.core = core

        return this.init()
    }

    /**
     * calling this function meand to setup all that need to configure view on express js
     *
     * @returns
     *
     * @memberOf ViewEngineSetup
     */
    init() {
        // check if is not production
        const isDev = !(this.core.env.APP_ENV === 'production')

        // set views template should store
        this
            .core
            .app
            .set('views', path.join(this.core.rootPath + '/app/resources/views'))

        // using nunjucks as template on express
        expressNunjucks(this.core.app, {
            watch: isDev,
            noCache: isDev
        })

        this
            .core
            .app
            .use(bodyParser.urlencoded({extended: false}))

        this
            .core
            .app
            .use(bodyParser.json())

        this
            .core
            .app
            .use(express.static(path.join(this.core.rootPath, 'public')))

        return this.core
    }
}

module.exports = ViewEngineSetup