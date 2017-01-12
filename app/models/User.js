'use strict';


var path = require('path');
var root = path.resolve();


var Eloquent = require(root + '/helpers/cores/Eloquent');

class User extends Eloquent {
	constructor(SubdomainName) {
	   	super('User', SubdomainName);
	}
}

module.exports = User;