var path = require('path');
var root = path.resolve();

var env = require( '../helpers/env' )();
/*jslint node: true */
"use strict";
module.exports.mysql = {
    driver     : env.db.driver,
    host       : env.db.host,
    port       : env.db.port,
    username   : env.db.user,
    password   : env.db.password,
    database   : env.db.database,
    autoReconnect : true
};

module.exports.mongodb = {
    driver: env.db.driver,
    host: env.db.host,
    port: env.db.port,
    username: env.db.user,
    password: env.db.password,
    database: env.db.database,
    pool       : true
};

module.exports.sqlite = {
    driver     : "sqlite3",
    database   : root + "/storage/mySite.db"
};