'use strict';

var path = require('path');
var root = path.resolve();

var Eloquent = require(root + '/helpers/cores/Eloquent');

class Category extends Eloquent {
	constructor(SubdomainName) {
		super('Category', SubdomainName);
	}

	product() {
		return this.hasMany('app/models/Product', 'category_id', 'id', 'product' , ['brand', 'created']);
	}
}

module.exports = Category;