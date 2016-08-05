
var socketHandler = function(socket) {
	socket.on('connect',function() {
		console.log('a user connected',socket.request.connection);
		socket.on('disconnect',function() {
			console.log('a user disconnected');
		});
	});
	
	socket.emit('send:name', {
		name:'Bob'
	});
	
	socket.on('chat message',function(msg) {
		console.log(msg);
		socket.emit('chat message',msg);
	});
}

module.exports = socketHandler;