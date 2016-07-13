/* jslint node: true */
"use strict";

var ApiResponse = function() {
    this.messages = {
        1: 'Success',
    };

    this.data = {};
    this.token = null;
    this.message = 'Success';
    this.status = 1;
    this.change = true;
};

ApiResponse.prototype.setEmpty = function() {
    if (!this.change) {
        this.data = {};
        this.token = null;
        this.message = 'Success';
        this.status = 1;
        this.change = true;
    }
}

ApiResponse.prototype.setError = function(data) {
    this.setEmpty();
    var err = {
        messages: data
    };
    this.data['errors'] = err;
};

ApiResponse.prototype.setData = function(data, key) {
    this.setEmpty();
    if (key !== undefined) {
        if (key == 'errors') {
            this.setError(data);
        } else {
            this.data[key] = data;
        }
    } else {
        this.data = data;
    }
};

ApiResponse.prototype.setToken = function(token) {
    this.setEmpty();
    this.token = token;
}

ApiResponse.prototype.setStatus = function(status) {
    this.setEmpty();
    this.status = status;
    this.message = this.messages[status];
};

ApiResponse.prototype.getAll = function() {
    this.change = false;
    return {
        status: this.status,
        message: this.message,
        token: this.token,
        data: this.data
    };
};


module.exports = ApiResponse;
