var express    = require('express');
var router     = express.Router();
var controller = require('../helpers/controller');

/* GET home page. */
router.get('/', controller.namespace('', 'home', 'index'));

/**
 * Admin Routing
 */
router.get('/admin', controller.namespace('admin', 'auth', 'index'));


/**
 * Subdomain route
 */
router.get('/subdomain/:domain', controller.namespace('client', 'auth', 'index'));

module.exports = router;
