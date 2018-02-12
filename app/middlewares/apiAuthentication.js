const root = require('path').resolve()
const Middleware = require(root + '/core/utils/middleware')

class ApiAuthentication extends Middleware {
    handle() {
        const apiKey = this
            .req
            .get('api-key')

        if (apiKey !== this.env.API_KEY) {
            this
                .response
                .setStatus(3)

            return this
                .res
                .status(403)
                .json(this.response.getAll())
        } else {
            return this.next()
        }
    }
}

module.exports = ApiAuthentication