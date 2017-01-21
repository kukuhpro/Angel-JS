'use strict';
var root         = require('path').resolve();
var controller = require(root + '/helpers/cores/Angel/Controller');

var Product = require(root + '/app/models/Product');
var Category = require(root + '/app/models/Category');


class home extends controller {
	constructor() {
		super();
	}
	
	test3() {
		return this.res.render('index', {});
	}

	index() {
		var category = new Category();
		category.with('product').where().get((err, data) => {
			if (data == null) {
				console.log('ERROR + ' + err);
				return this.res.json({});
			} else {
				return this.res.json(data.first());
			}
		});
	}

	test() {
		var product = new Product();
		product.with('category', 'brand', 'created').where({where: {id: 1}}).get((err, data) => {
			if (data == null) {
				console.log('ERROR' + err);
				return this.res.json({});
			} else {
				return this.res.json(data.all());
			}	
		});
	}

	email() {
		var data = {
			from: this.env.email_from,
            to: "kukuhpro@gmail.com",
            subject: "Test Email",
            templatePath: 'emails/test',
            data: {}
		};

		this.mailsend(data, function (err, info) {
			console.log(err);
			return this.res.json({info});
		}.bind(this));
	}
}

module.exports = home;