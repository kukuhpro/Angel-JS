var abstract = require('./abstract');

class Chat extends abstract {
	constructor (socket, name_connection = 'default') {
		super(socket);
		this.name_connection = name_connection;
	}

	handleListen (obj, ios, data) {
		obj.send(obj, ios, data);
	}
}

module.exports = Chat;