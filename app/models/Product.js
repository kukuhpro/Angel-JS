'use strict';

var path = require('path');
var root = path.resolve();


var Eloquent = require(root + '/helpers/cores/Eloquent');

class Product extends Eloquent {
	constructor(SubdomainName) {
		super('Product', SubdomainName);
	}

	category() {
		return this.belongsTo('app/models/Category', 'category_id');
	}

	brand() {
		return this.belongsTo('app/models/Brand', 'brand_id');
	}

	created() {
		return this.belongsTo('app/models/User', 'created_by', 'id', 'created');
	}
}

module.exports = Product;