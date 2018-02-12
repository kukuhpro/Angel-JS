const root = require('path').resolve()
const AbstractRequest = require(root + '/core/utils/request')

class request extends AbstractRequest {
    constructor() {
        super()
    }
}

module.exports = request