/**
 * parent class for handling controller
 *
 * @class Controller
 */
class Controller {
    constructor() {}

    setupSomeHelper(core) {
        this.cache = core.cache
    }

    /**
     * This function is to handle all process in the controller on what method should call in controller
     *
     * @param {function} req
     * @param {function} res
     * @param {function} next
     * @param {string} method
     * @returns
     *
     * @memberOf Controller
     */
    handle(req, res, next, method) {
        this.req = req
        this.res = res
        this.next = next

        if (this.req.method == 'GET') {
            this.req.session.previousurl = (this.req.session.currenturl != undefined)
                ? this.req.session.currenturl
                : this.req.route.path
            this.req.session.currenturl = this.req.route.path
        }

        if (req.csrfToken) {
            req.app.locals.csrfToken = req.csrfToken()
        }

        return this[method]()
    }
}

module.exports = Controller