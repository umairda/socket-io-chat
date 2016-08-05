var userModel = require('../models/user.model.js');

var userController = {
	
	isLoggedIn: function(req,res,next) {
		console.log('isLoggedIn',req.query);
		if (!req.query.sessionId) {
			console.log('sessionId not set');
			res.status(401);
			res.send({ status:'error', error:'Not logged in'});
		}
		else {
			console.log('sessionId set');
			var user = userModel.getBySessionId(req.query.sessionId);
			console.log('isLoggedIn user',user);
			
			user.then(function(_user) {
				console.log('_user',_user);
				if (_user) {
					console.log('next');
					next();
				} 
				else {
					console.log('not logged in');
					res.status(401);
					res.send({status:'error',error:'Not logged in'});
				}					
			},function(err) {
				console.log('error looking up user by sessionId:',err);
			});
		}
	},
	
	login: function(req,res) {
		console.log('login',req.body);
		if (!req.body.username || !req.body.password) {
			res.status(400);
			res.send({status:'error',error:'Username or password is missing'});
		}
		else {		
			var user = userModel.login(req.body.username,req.body.password,req.connection.remoteAddress);
			user.then(function(response) {
				if (response.success) {
					console.log('logged in',response);
					res.send(response);
				}
				else {
					//invalid username or password
					res.send(response);
				}
			},function(error) {
				var message = error.message;
				if (error.code === 1234) {
					console.log('user already logged in');
				}
				else if (error.code === 11000) {
					console.log('duplicate user');
				}
				else {
					console.log('error occurred while logging in');
				}
				res.send({ status:"error", message:message,	error: error });
			});
		}
	},
	
	logout: function(req,res) {
		var sessionId = req.query.sessionId;
		var response = userModel.logout('sessionId',sessionId);
		console.log('logout response user.js',response);
		res.send(response);
	},
	
	register: function(req,res) {
		if (!req.body.username || !req.body.password) {
			res.status(400);
			res.send({status:'error',error:'Username or password is missing'});
		}
		else {
			var ip = req.connection.remoteAddress;
			var userPromise = userModel.register(req.body.username,req.body.password,ip);
			userPromise.then(function(response) {
				console.log(response);
				res.send({ success:true, username:response, message:"" });
			},function(error) {
				if (error.code === 11000) {
					res.send({ success:false, message:"Duplicate user" });
				}
				else {
					res.send({ success:false, message:"Error occurred while registering user" });
				}
			});
		}
	},
	
	logoutAll: function(req,res) {
		userModel.logoutAll().then(function(response) {
			res.send(response);
		},function(err) {
			res.send(err);
		});
	},
};

module.exports = userController;