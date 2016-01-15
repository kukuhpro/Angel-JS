var express    = require('express');
var router     = express.Router();
var controller = require('../helpers/controller');
var group      = require('../helpers/group')(router);

var middleware = require('../config/middleware');

// This Grouping for routing
// you must include prefix to use this group routing
// but also you can add middleware 
group.routing({prefix: "/api/v1", middleware: middleware.isLoggedIn}, function(route) {
	route({method:"get", url:"/foo", callback:controller.namespace('', 'foo', 'index')});
});

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

