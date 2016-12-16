'use strict';

class Collection {
	constructor() {
		this.data = [];
	}

	pushItem(item) {
		this.data.push(item);
	} 

	replaceData(newdata, index) {
		if (index == undefined) {
			this.data = newdata;
		} else {
			this.data[index] = newdata;
		}
	}

	pushArray(array) {
		if (this.data.length > 0) {
			this.data = this.data.concat(array);
		} else {
			this.data = array;
		}
	}

	all() {
		return Array.from(this.data);
	}

	first() {
		return this.data[0];
	}

	lists(column) {
		let ListArray = Array.from([]);
		for (var i = this.data.length - 1; i >= 0; i--) {
			if (this.data[i][column] !== undefined) {
				ListArray.push(this.data[i][column])
			}
		}

		return ListArray;
	}
}


module.exports = Collection;