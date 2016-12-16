'use strict';

var path = require('path');
var root = path.resolve();

var Eloquent = require(root + '/helpers/cores/Eloquent');

class Brand extends Eloquent {
	constructor(SubdomainName) {
		super('Brand', SubdomainName);
	}

	product() {
		return this.hasMany('app/models/Product', 'brand_id');
	}
}

module.exports = Brand;