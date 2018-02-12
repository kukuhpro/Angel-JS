const csrf = require('csurf')

class Setup {
    constructor(core) {
        this.core = core
        // this     .core     .app     .use(csrf({cookie: true}))
    }

    process(arrayOfMiddleware) {
        let newHandleMiddleware = []
        const lengthOfArray = arrayOfMiddleware.length
        for (var index = 0; index < lengthOfArray; index++) {
            var element = arrayOfMiddleware[index];

            const fileMiddleware = require(this.core.middlewaresPath + element)
            const classMiddleware = new fileMiddleware()
            classMiddleware.setSomeHelper(this.core)
            newHandleMiddleware.push(function (req, res, next) {
                classMiddleware.handleExpression(req, res, next)
            }.bind(this))
        }
        return newHandleMiddleware
    }

}

module.exports = Setup