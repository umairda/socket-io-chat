var serverHelpers = function() {
	return {
		/**
		 * Normalize a port into a number, string, or false.
		 */
		normalizePort: function(val) {
		  var port = parseInt(val, 10);
		  if (isNaN(port)) {
			// named pipe
			return val;
		  }
		  if (port >= 0) {
			// port number
			return port;
		  }
		  return false;
		},
	};
};

module.exports = serverHelpers;