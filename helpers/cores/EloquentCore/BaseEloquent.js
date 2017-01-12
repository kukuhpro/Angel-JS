'use strict';

var Collection = require('./Collection');
var moment = require('moment');
var Model = require('./Database/Model');


class BaseEloquent {
	constructor() {
		this.collections = new Collection();
		this.relations = [];
		this.filter = {};
		this.CoreModel  = new Model(this.SubdomainName);
	}

	getCoreModel() {
		return this.CoreModel;
	}

	get schemaName() {
		return this.SchemaName;
	}

	promiseModel(funct, objectData) {
		return new Promise((resolve, reject) => {
			this.model[funct](objectData, function(err, datas) {
				if (err) {
					console.log('ERROR Promise Model Find | ' + err);
					resolve([]);
				}
				resolve(datas);
			});
		});
	}

	where(filter) {
		this.filter = Object.assign(this.filter, filter);
		return this;
	}

	successCallback(data) {
		this.callback(null, data);
	}

	errorCallback(err) {
		console.log('ERROR BaseEloquent : ' + this.SchemaName + ' | ' + err);
		this.callback(err, null);
	}

	with(arrays) {
		if (arrays instanceof Array) {
			this.relations = Array.from(arrays);
		} else {
			this.relations = Array.from(arguments);
		}
		return this;
	}

	getModel() {
		return this.model;
	}
}

module.exports = BaseEloquent;