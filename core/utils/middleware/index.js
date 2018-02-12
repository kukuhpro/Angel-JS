const ApiResponse = require('../request/apiresponse')

/**
 * Parent class for middleware class
 *
 * @class Middleware
 */
class Middleware {
    setSomeHelper(core) {
        this.env = core.env

        this.response = new ApiResponse()
        this.URL = core.app.locals.URL
    }

    handleExpression(req, res, next) {
        this.req = req
        this.res = res
        this.next = next

        return this.handle()
    }
}

module.exports = Middleware