var user = require('../controllers/user.controller.js');

var routes = function(app) {
	app.get('/', function(req, res){
	  res.render('../views/index');
	});
	
	app.post('/user/login',user.login);
	app.get('/user/logout',user.isLoggedIn,user.logout);
	app.post('/user/register',user.register);	
}

module.exports = routes;