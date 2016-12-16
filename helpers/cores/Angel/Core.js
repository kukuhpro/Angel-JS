'use strict';
var path         = require('path');
var root         = require('path').resolve();

var express = require('express');
var Utils        = require(root + '/helpers/utils');
var apiresponse = require(root + '/app/helpers/ApiResponse');

class Core  {
	constructor() {
		/**
		 * Set Singleton pattern on Core Class
		*/
		if (!Core.instances) {
			Core.instances = this;
			this.app = express();
			this.router = express.Router();
			this.path = path;
			this.root = root;
			this.apiresponse = new apiresponse();
			this.utils = Utils; 
			this.env = require(root + '/helpers/env')();
			this.debug = require('debug')(this.env.appName + ':application');
			this.debug_api    = require('debug')(this.env.appName + ':api');
		}


		return Core.instances;
	}

	make(name, obj) {
		this[name] = obj;
		return this;
	}
}	

module.exports = Core;