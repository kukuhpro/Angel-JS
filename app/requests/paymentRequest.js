const Joi = require('joi')
const Request = require('./request')

class PaymentRequest extends Request {
    rules() {
        return {
            order_id: Joi
                .string()
                .required(),
            amount: Joi
                .number()
                .required()
        }
    }
}

module.exports = PaymentRequest