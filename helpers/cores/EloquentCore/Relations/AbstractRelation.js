'use strict';

var co = require('co');	

class Relation {
	constructor() {
	}

	promise() {
		return new Promise((resolve, reject) => {
			const dataCollection = Array.from(this.collections.all());
			const length = dataCollection.length;
			co(function* () {
				for (var i = 0;i < length; i++) {
					const newDataRelation = yield this.find(i);
					this.collections.replaceData(newDataRelation, i);
				}
				return this.collections;
			}.bind(this)).then(function(data) {
				resolve(this.collections.all());
			}.bind(this));
		});
	}

	promisePivotTable() {
		return new Promise((res, rej) => {
			
		});
	}
}

module.exports = Relation;