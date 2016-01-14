"use strict";

var auth = require('express').Router();


exports.index = function(req, res) {
	res.render('index', {title: 'Etalastic'});
};