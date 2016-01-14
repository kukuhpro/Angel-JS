"use strict";

var models = require('../config/models');

module.exports = {
	model: function(name, subdomain) {
		var model = models.call(name, subdomain);
		return model;
	}
};