"use strict";

var express = require('express');
var home    = express.Router();
var root    = require('path').resolve();
var caminte = require(root + '/helpers/caminte');

exports.index = function(req, res) {
	var clientName = req.params.domain;
	var User       = caminte.model('User', clientName);
	
    return res.render('index', { title: clientName});
};