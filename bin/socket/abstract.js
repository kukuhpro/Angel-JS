class abstract {
	constructor (socket) {
		this.socket = socket;
		this.name_connection = '';
	}

	send (obj, ios, data) {
		ios.emit(obj.name_connection, data);
	}

	listen (ios) {
		this.socket.on(this.name_connection, function(data) {
			this.handleListen(this, ios, data);
		}.bind(this));
	}
}

module.exports = abstract;