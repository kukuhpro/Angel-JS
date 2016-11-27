var io = require('socket.io');
var Chat = require('./socket/chat');

var Socket = function(server) {
	this.io = io(server);
	var obj = this;

	Socket.prototype.listen = function (sc) {
		obj.cht = new Chat(sc, 'chat');
		obj.setChatSocket();
	};	

	Socket.prototype.setChatSocket = function() {
		obj.cht.listen(obj.io);
	};

	this.io.on('connection', this.listen);
};

module.exports = Socket;