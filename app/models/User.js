'use strict';


var path = require('path');
var root = path.resolve();


var Eloquent = require(root + '/helpers/cores/Eloquent');
var City = require('./City');


class User extends Eloquent {
	constructor(SubdomainName) {
	   	super('User', SubdomainName);
	}
}

module.exports = User;