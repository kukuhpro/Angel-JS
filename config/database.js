var env = require('../helpers/env')();

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
    driver: 'mongodb',
    host: 'localhost',
    port: 27010
};