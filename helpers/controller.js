"use strict";

module.exports = {
	namespace: function(namespace, fileName, method) {
		if (namespace != undefined) {
			var file =  require('../app/controllers/' + namespace + '/' + fileName);
		} else {
			var file =  require('../app/controllers/' + fileName);
		}
		return file[method];
	}
};
