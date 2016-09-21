/*jslint node: true */
"use strict";

var express    = require('express');
var validate   = require('express-validation');
var router     = express.Router();
var controller = require('../../helpers/controller');
var group      = require('../../helpers/group')(router);

router.get('/', controller('site', 'home', 'index'));

group.routing({ prefix: "/secure" }, function(route) { 
	route({method: "get", url: "/", middleware:[],callback: controller('site', 'home', 'index')});
});

module.exports = router;