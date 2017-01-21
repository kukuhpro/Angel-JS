'use strict';
var path = require('path');
var root = path.resolve();
var co = require('co');

var BaseEloquent = require('./EloquentCore/BaseEloquent');
var BelongsTo = require('./EloquentCore/Relations/BelongsTo');
var HasMany = require('./EloquentCore/Relations/HasMany');
var BelongsToMany = require('./EloquentCore/Relations/BelongsToMany');

class Eloquent extends BaseEloquent
{
	constructor(SchemaName, SubdomainName) {
		super();
		this.SchemaName = SchemaName;
		this.SubdomainName = SubdomainName;
		this.model = this.CoreModel.load(SchemaName);
	}

	get(callback) {
		this.callback = callback;
		co(function* () {
			const data = yield this.promiseModel('find', this.filter);
			this.collections.replaceData(data);
			for (var i = this.relations.length - 1; i >= 0; i--) {
				let relationData = yield this[this.relations[i]]();
				this.collections.replaceData(relationData);
			}
			return this.collections.all();
		}.bind(this)).then((data) => {
			if (data.length > 0) {
				this.successCallback(this.collections);
			} else {
				this.successCallback(this.collections.replaceData([]));
			}
		}).catch((err) => {
			this.errorCallback(err);
		});
	}

	create(CreateData, callback) {
		this.callback = callback;
		co(function* () {
			const data = yield this.promiseModel('create', CreateData);
			this.collections.pushItem(data);

			return this.collections.all();
		}.bind(this)).then((data) => {
			if (data.length > 0) {
				this.successCallback(this.collections);
			} else {
				this.successCallback(this.collections.replaceData([]));
			}
		}).catch((err) => {
			this.errorCallback(err);
		});
	}


	belongsTo(ClassChildDir, ColumnParent, ColumnChild, relationName, relations) {
		const ClassRequire = require(root + '/' + ClassChildDir);
		return new BelongsTo(this.collections, new ClassRequire(this.SubdomainName), ColumnParent, ColumnChild, relationName, relations);
	}

	hasMany(ClassChildDir, ColumnParent, ColumnChild, relationName, relations) {
		const ClassRequire = require(root + '/' + ClassChildDir);
		return new HasMany(this.collections, new ClassRequire(this.SubdomainName), ColumnParent,  ColumnChild, relationName, relations);
	}

	belongsToMany() {
		
	}
}

module.exports = Eloquent;