'use strict';

var path = require('path');
var root = path.resolve();


var Eloquent = require(root + '/helpers/cores/Eloquent');

class City extends Eloquent {
	constructor(SubdomainName) {
		this.schema = 'User';
	   	super(this.schema, SubdomainName);
	}

	user() {
		return this.hasMany('app/models/User', 'city_id');
	}
}

module.exports = City;