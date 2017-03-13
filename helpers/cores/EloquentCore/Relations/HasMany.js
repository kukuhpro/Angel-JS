'use strict'

var co = require('co');	
var AbstractRelation = require('./AbstractRelation');


class HasMany extends AbstractRelation {
	constructor (collections, ClassParent, ColumnParent, ColumnChild, relationName, relations) {
		super();
		this.collections = collections;
		this.ClassParent = ClassParent;
		this.ColumnChild = ColumnChild;
		this.ColumnParent = ColumnParent;
		this.relationName = relationName;
		this.relations = relations;

		return this.promise();
	}

	getFilter(allData, i) {
		let filter = {};
		if (this.ColumnChild !== undefined) {
			filter[this.ColumnParent] = allData[i][this.ColumnChild];
		} else {
			filter[this.ColumnParent] = allData[i]['id'];
		}
		if (this.relations !== undefined && this.relations instanceof Array && this.relations.length > 0) {
			this.ClassParent = this.ClassParent.with(this.relations);
		}
		return filter;
	}

	find(i) {
		return new Promise((r, j) => {
			const dataAll = this.collections.all();
			const filter = this.getFilter(dataAll, i);
			this.ClassParent.where({where: filter}).get(function(err, data) {
				const dataCollection = this.collections.all();
				const relationName = this.relationName == undefined ? this.ClassParent.schemaName : this.relationName;
				if (err || data == null || data === undefined) {
					console.log('Get Nothing from HasMany : ' + err);
					dataCollection[i][relationName.toLowerCase()] = Array.from([]);
				} else {
					dataCollection[i][relationName.toLowerCase()] = data.all();
				}
				r(dataCollection[i]);
			}.bind(this));
		});
	}
}

module.exports = HasMany;