var userModel = require('../models/user.model.js');

var socketHandler = function(io) {
	var client = { cliendId: null, loggedIn: null, user: null };
	io.sockets.on('connection',function(socket) {
		console.log('a user connected');
		client = { clientId: socket.client.conn.id, user: null };
		console.log('socket client.conn.id', socket.client.conn.id);
		socket.on('disconnect', function(socket) {
			if (client.loggedIn) {
				console.log("Logging out",client.user);
				var response = userModel.logout('username',client.user);
				console.log('logout response',response);
			}
			console.log('user disconnected:',client.user);
			console.log('client', client.clientId);
		})
		
		socket.on('bindSocketToUser',function(obj) {
			console.log('previous client.user',client.user);
			console.log('binding socket',client.clientId,"to username",obj.username);
			client.user = obj.username;
			client.loggedIn = obj.loggedIn;
		})
		
		socket.on('subscribe',function(obj) {
			io.sockets.emit('room list',{ "roomList": io.sockets.adapter.rooms });
			console.log(obj.user+' joined room', obj.room);
			socket.join(obj.room);
			io.sockets.in(obj.room).emit('joined room',obj);
		})
		
		socket.on('unsubscribe', function(obj) {
			console.log(obj.user+' left room', obj.room);
			socket.leave(obj.room);
			io.sockets.in(obj.room).emit('left room',obj);
		})
		
		socket.on('chat message', function(data) {
			console.log('sending message', data);
			io.sockets.in(data.room).emit('chat message', data);
		})
	})
}

module.exports = socketHandler;