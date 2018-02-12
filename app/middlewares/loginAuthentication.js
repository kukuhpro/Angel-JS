const root = require('path').resolve()
const Middleware = require(root + '/core/utils/middleware')

class LoginAuthentication extends Middleware {
    handle() {
        const userLogin = this.req.session.user

        if (!userLogin) {
            return this
                .res
                .redirect(this.URL.route('form.login'))
        }

        return this.next()
    }
}

module.exports = LoginAuthentication