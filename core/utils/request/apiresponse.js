let ApiResponse = function () {
    this.messages = {
        1: 'Success',
        3: 'Forbidden',
        4: 'Invalid Parameters'
    }

    this.data = {}
    this.token = null
    this.message = 'Success'
    this.status = 1
    this.change = true
}

ApiResponse.prototype.setEmpty = function () {
    if (!this.change) {
        this.data = {}
        this.token = null
        this.message = 'Success'
        this.status = 1
        this.change = true
    }
}

ApiResponse.prototype.setData = function (data, key) {
    this.setEmpty()
    if (key !== undefined) {
        this.data[key] = data
    } else {
        this.data = data
    }
}

ApiResponse.prototype.setToken = function (token) {
    this.setEmpty()
    this.token = token
}

ApiResponse.prototype.setStatus = function (status) {
    this.setEmpty()
    this.status = status
    this.message = this.messages[status]
}

ApiResponse.prototype.getAll = function () {
    this.change = false
    return {
        status: this.status,
        message: this.message,
        token: this.token,
        data: Object.keys(this.data) <= 0
            ? null
            : this.data
    }
}

module.exports = ApiResponse