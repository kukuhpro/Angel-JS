const Angel = require('./helpers/cores/Angel');
let angel = new Angel();

/**
 * Running for setting up all configurations
 */
angel.run();

/**
 * Running application on server.
 */
angel.server();
