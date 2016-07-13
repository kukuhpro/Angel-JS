var env = require('../helpers/env')();

module.exports = {
    host: env.redis_host, // default value
    port: env.redis_port, // default value
    auth_pass: '',
    db: 0
};