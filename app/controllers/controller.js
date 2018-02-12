const root = require('path').resolve()
const Abstract = require(root + '/core/utils/controller/controller')
const ApiResponse = require(root + '/core/utils/request/apiresponse')

class controller extends Abstract {
    constructor() {
        super()
        this.response = new ApiResponse()
    }
}

module.exports = controller