'use strict'

var co = require('co');	
var AbstractRelation = require('./AbstractRelation');

class BelongsTo extends AbstractRelation {
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
			filter[this.ColumnChild] = allData[i][this.ColumnParent];
		} else {
			filter.id = allData[i][this.ColumnParent];
		}

		if (this.relations !== undefined && this.relations instanceof Array && this.relations.length > 0) {
			this.ClassParent = this.ClassParent.with(this.relations);
		}
		return filter;
	}

	find(i) {
		return new Promise((r, j) => {
			const allData = this.collections.all();
			let filter = this.getFilter(allData, i);
			this.ClassParent.where({where: filter}).get(function(err, data) {
				const dataCollection = this.collections.all();
				const relationName = this.relationName == undefined ? this.ClassParent.schemaName : this.relationName;
				if (err && data == null && data !== undefined) {
					console.log('ERROR BelongsTo : ' + err);
					dataCollection[i][relationName.toLowerCase()] = {};
				} else {
					dataCollection[i][relationName.toLowerCase()] = data.first();
				}
				r(dataCollection[i]);
			}.bind(this));
		});	
	}
}

module.exports = BelongsTo;