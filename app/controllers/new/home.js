'use strict';
var root         = require('path').resolve();
var controller = require(root + '/helpers/cores/Angel/Controller');

class home extends controller {
	constructor() {
		super();
	}

	index() {
		return this.res.redirect(this.url.route('angelsite'));
	}

	form() {
		return this.res.render('form', {});
	}

	storeForm() {
		return this.res.json(this.req.body);
	}
}

module.exports = home;