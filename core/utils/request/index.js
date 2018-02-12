const Joi = require('joi')
const helper = require('../helper')
const ApiResponse = require('./apiresponse')

class Request {
    handleExpression(req, res, next) {
        this.response = new ApiResponse()
        this.req = req
        this.res = res
        this.next = next

        return this.handle()
    }

    handleError(error) {
        this
            .response
            .setStatus(4)
        this
            .response
            .setData(helper.convertError(error), 'errors')

        return this
            .res
            .json(this.response.getAll())
    }

    handle() {
        const validation = this.rules()
        const {error, value} = Joi.validate(this.req.body, validation)

        if (error != null) {
            return this.handleError(error)
        } else {
            return this.next()
        }
    }

}

module.exports = Request