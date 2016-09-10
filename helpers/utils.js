/* jslint node: true */
"use strict";

var path = require('path');
var root = path.resolve();

var Utils = {
    processError: function(data, callback) {
        var len = data.length;
        var messages = [];
        for (var i = 0; i < len; i++) {
            var dt = data[i];
            // var rt = dt.messages[0].match(/\"(.+)\"/g);
            // var trs = dt.messages[0].replace(rt[0] + " ", "");
            // messages.push(Local.translate(trs, rt[0]));
            messages.push(dt.messages[0]);
        }
        callback(messages);
    },
    splitNCallObject: function(object, string, separator = '.') {
        if (~string.indexOf(separator)) {
            var split = string.split(separator);
            var splitLength = split.length;
            for (var i = 0; i < splitLength; i++) {
                object = object[split[i]]
            }
            return object;
        } else {
            return object[string];
        }
    },
    extendArray: function(target) {
        var sources = [].slice.call(arguments, 1);
        sources.forEach(function (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }
};


module.exports = Utils;
