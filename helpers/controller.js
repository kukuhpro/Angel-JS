/* jslint node: true */
"use strict";

/**
 *  Controller callback function helpers.
 **/


module.exports = function(namespace, fileName, method) {
    try {
        if (namespace !== undefined) {
            var file = require('../app/controllers/' + namespace + '/' + fileName);
        } else {
            var file = require('../app/controllers/' + fileName);
        }
        if (file[method] === undefined) {
            console.error("Undefined controller method: '" + fileName + "." + method + "'");
        } else {
            return file[method];
        }
    } catch (e) {
        console.error("Undefined controller: '" + (namespace ? namespace + "." : "") + fileName + "'");
        console.trace(e);
    }
    return [];
};
