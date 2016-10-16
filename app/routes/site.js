/*jslint node: true */
"use strict";

var express    = require('express');
var validate   = require('express-validation');
var router     = express.Router();
var controller = require('../../helpers/controller');
var routing      = require('../../helpers/routing')(router);

routing.single({method: "get", name: 'homesite' ,url: "/", middleware:[], callback: controller('site', 'home', 'index')});
routing.group({ prefix: "/secure" }, function(route) { 
	route({method: "get", url: "/", name: 'securesite', middleware:[],callback: controller('site', 'home', 'index')});
});

module.exports = router;