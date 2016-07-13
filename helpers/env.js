/*jslint node: true */
"use strict";

/**
 *  Environment loader
 **/

module.exports = function(clientName) {
    var parsedJson = require('../.env.json');
    if (clientName !== undefined) {
        parsedJson = require('../config/client/' + clientName + '.json');
    }
    return parsedJson;
};
