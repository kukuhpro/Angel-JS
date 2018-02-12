class SetupRequest {
    constructor(core) {
        this.core = core
    }

    handle(fileRequestValidation) {
        let middlewareValidation = []
        const requestFile = require(this.core.requestPath + fileRequestValidation)
        const requestClass = new requestFile()

        middlewareValidation.push((req, res, next) => {
            return requestClass.handleExpression(req, res, next)
        })

        return middlewareValidation
    }
}

module.exports = SetupRequest