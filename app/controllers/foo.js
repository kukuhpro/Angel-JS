"use strict";

var express = require('express');
var foo = express.Router();

exports.index = function(req, res) {
	 return res.render('index', {
        title: 'Grouping is working'
    });
};