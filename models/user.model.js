var mongoose = require('mongoose');
var q = require('q');

var UserSchema = new mongoose.Schema({
	username:	{type: String,	required: [true, 'username missing'], unique: true},
	password: 	{type: String,	required: [true, 'password missing']},
	sessionId:	{type: String },
	socket:		{type: String },
	created: 	{type: Date, 	required: [true, 'created missing']},
	lastLogin: 	{type: Date},
	IPs: 		{type: Array},
});

//UserSchema.index({username:1},{unique:true});

var User = mongoose.model('User', UserSchema);
User.ensureIndexes(function (err) {
	if (err) console.log(err);
});

function makeSessionId()
{
	console.log('makeSessionId');
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
	
	var results = q.defer();
	
	User.findOne({sessionId: text},function(err,user) {
		if (err) {
			console.log(error);
			//error with query
			results.reject(err);
		}
		else if (user) {
			console.log('user',user);
			//user with that sessionId already exists, make a new one
			results.resolve(makeSessionId());
		}
		else {
			console.log('unique sessionId');
			//unique sessionId
			results.resolve(text);
		}
	});
	
    return results.promise;
}

var userModel = {};

userModel.getBySessionId = function(sessionId) {
	var results = q.defer();
	console.log('getBySessionId',sessionId);
	User.findOne({ sessionId: sessionId }, function(err,user) {
		if (err) {
			console.log('findOne error:',err);
			results.reject(err);
		}
		else if (user) {
			console.log('findOne user:',user);
			results.resolve(user);
		}
		else {
			console.log('findOne user not defined:',user);
			results.resolve(null);
		}
	});
	
	return results.promise;
};

userModel.login = function(username,password,ip) {
	var results = q.defer();
	
	User.findOne({username: username, password: password}, function(err,user) {
		if(err) {
			results.reject(err);
		}
		else if(user) {
			//user is not logged in
			if (user.sessionId === '') {
				makeSessionId().then(function(sessionId) {
					user.sessionId = sessionId;
					user.markModified('sessionId');
					
					user.lastLogin = new Date();
					user.markModified('lastLogin');
					
					if (user.IPs.indexOf(ip)===-1) {
						user.IPs.push(ip);
						user.markModified(IPs);
					}
					
					user.save(function(err,_user,numAffected) {
						if (err) {
							console.log("Error saving document",_user);
							results.reject(err);
						}
						else {
							console.log("Saved document",_user);
							var response = {};
							response.success = true;
							response.sessionId = _user.sessionId;
							response.username = _user.username;
							results.resolve(response);
						}
					});
				}, function(err) {
					console.log("Error making sessionId",user);
					results.reject(err);
				});
			}
			//user is already logged in
			else {
				var err = {};
				err.code = 1234;
				err.message = "User is already logged in";
				results.reject(err);
			}
		}
		else {
			console.log("Invalid username, password");
			var response = {};
			response.success = false;
			response.error = 'Invalid username or password';
			results.resolve(response);
		}
	});
	
	return results.promise;
};

userModel.logout = function(field,value) {
	console.log('userModel.logout',field,value);
	var results = q.defer();
	var obj = {};
	obj[field] = value;

	User.findOne(obj, function(err,user) {
		if (err) {
			results.reject(err);
		}
		else if (user) {
			user.sessionId = '';
			user.markModified(field);
			user.save(function(err,_user) {
				if (err) {
					console.log("Error reseting ",field,_user);
					results.reject(err);
				}
				else {
					var response = {};
					response.status = "success";
					response.user = _user;
					
					results.resolve(response);
				}
			});
		}
		else {
			results.resolve({status:"error",error:"No active field",field});
		}
	});
	return results.promise;
};

userModel.logoutAll = function() {
	var results = q.defer();
	
	var user = User.find();
	
	return results.promise;
};

userModel.register = function(username,password,ip) {
	var results = q.defer();
	
	var user = new User({username: username, password: password, created: new Date(), IPs: ip, lastLogin: new Date(), sessionId:""});
	user.save(function(err,_user) {
		if (err) {
			results.reject(err);
		}
		else {
			results.resolve(username);
		}
	});
	
	return results.promise;
};

module.exports = userModel;
