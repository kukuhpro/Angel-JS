"use strict";

module.exports = function(clientName) {
	if (clientName != undefined) {
		var parsedJson = require('../config/client/' + clientName + '.json');
	} else {
		var parsedJson = require('../env.json');
	}
	return parsedJson;
};