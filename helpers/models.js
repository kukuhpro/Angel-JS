/*jslint node: true */
"use strict";

/**
 *  models loader
 *
 *  App based on CaminteJS
 **/

var express   = require('express');
var app       = express();
var env       = require('./env')();
var Cache     = require('./cache');
var caminte   = require('caminte');
var Schema    = caminte.Schema;
var fs        = require('fs');
var path      = require('path');
var modelDir  = path.resolve(__dirname, './../app/models');
var modelList = fs.readdirSync(modelDir);
var dbConf    = require('../config/database');
var database  = dbConf[env.db.driver];
var schema    = new Schema(database.driver, database);

module.exports.call = function(modelName, subdomain) {
    var schemaSubdomain = app.locals[subdomain + '-schema'];
    if (subdomain !== undefined) {
        if (schemaSubdomain == undefined) {
            var config                        = require('./env')(subdomain);
            var dbConfig                      = config.db;
            dbConfig.username                 = dbConfig.user;
            var newSchema                     = new Schema(dbConfig.driver, dbConfig);
            app.locals[subdomain + '-schema'] = newSchema;
            return require(modelDir + '/' + modelName + '.js')(newSchema);
        } else {
            return require(modelDir + '/' + modelName + '.js')(schemaSubdomain);
        }
    } else {
        return require(modelDir + '/' + modelName + '.js')(schema);
    }
};
module.exports.load = function(name, subdomain) {
    var model = this.call(name, subdomain);
    return model;
};
