const Joi = require('joi')
const SiteRequest = require('./siterequest')

class LoginRequest extends SiteRequest {
    rules() {
        return {
            "username": Joi.required()
        }
    }
}

module.exports = LoginRequest