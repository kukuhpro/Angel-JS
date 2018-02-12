const root = require('path').resolve()
const AbstractRequest = require(root + '/core/utils/request')
const helper = require('../../core/utils/helper')

class siterequest extends AbstractRequest {
    constructor() {
        super()
    }

    handleError(error) {
        this.req.app.locals.errors = helper.convertError(error)

        return this
            .res
            .redirect(this.req.session.previousurl)
    }
}

module.exports = siterequest