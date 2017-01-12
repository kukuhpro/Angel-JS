'use strict';

var co = require('co');	
var AbstractRelation = require('./AbstractRelation');
var Collection = require('../Collection');

class BelongsToMany extends AbstractRelation
{
	constructor (collections, ClassParent, relationTableName, ColumnParent, ColumnChild, relationName, relations) {
		super();
		this.collectionspivot = new Collection();
		this.collections = collections;
		this.ClassParent = ClassParent;
		this.relationTableName = relationTableName;
		this.ColumnChild = ColumnChild;
		this.ColumnParent = ColumnParent;
		this.relationName = relationName;
		this.relations = relations;
		this.coreModel = this.ClassParent.getCoreModel();
		this.schemamodelpivot = this.coreModel.injectSchemaOnly(this.schemaPivotTable());

		return this.promise();
	}

	getFilter(allData, i) {

	}

	schemaPivotTable() {
		return (schema) => {
			var PivotTable = schema.define('users_products', {
				id: {type: schema.String},
				[this.ColumnParent]: {type: schema.String},
				[this.ColumnChild]: {type: schema.String}
			});

			return PivotTable;
		}
	}

	promiseModelPivot(method, filter) {
		return new Promise((res, rej) => {
			this.schemamodelpivot[method](filter, function(err, datas) {
				if (err) {
					console.log('Error when try to get pivot table data.');
					resolve(this.collectionspivot.replaceData([]));
				}
				resolve(this.collectionspivot.replaceData(datas));
			}.bind(this));
		});
	}

	find(i) {
		// console.log(this.coreModel.injectSchemaOnly(this.schemaPivotTable()));
		return new Promise((resolve, reject)=> {
			const listsDataId = this.collections.lists('id');
			co(function* () {
				const filter = {
			      where: {
			         [this.ColumnParent]: {
			            in : listsDataId
			         }
			      }
			    };
				const collectionsPivotData = yield this.promiseModelPivot('find', filter);
				const listIdChild = collectionsPivotData.lists(this.ColumnChild);

				return listIdChild;
			}.bind(this)).then((listIdChild) => {
				this.ClassParent.where({where: {id: {in: listIdChild}}}).get(function(err, datas) {
					const dataCollection = this.collections.all();
					const relationName = this.relationName == undefined ? this.ClassParent.schemaName : this.relationName;
					if (err || data == null || data === undefined) {
						console.log('ERROR HasMany : ' + err);
						dataCollection[i][relationName.toLowerCase()] = Array.from([]);
					} else {
						dataCollection[i][relationName.toLowerCase()] = data.all();
					}
					resolve(dataCollection[i]);
				}.bind(this))
			});
		});
	}
}

module.exports = BelongsToMany;