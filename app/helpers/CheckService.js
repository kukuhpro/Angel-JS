/* jslint node: true */
"use strict";

var path = require('path');
var root = path.resolve();

var fs = require('fs');

var CheckService = {
    subdomainConfig: function(subdomainName, callback) {
        fs.stat(root + '/config/client/' + subdomainName + '.json', function(err, stat) {
            if (err == null) {
                var err = null;
                callback(err);
            } else {
                var err = true;
                callback(err)
            }
        });
    }
};


module.exports = CheckService;