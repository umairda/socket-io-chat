// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

// Get Mongo login credentials
var config = require('../config/config');

// Build the connection string 
if (config.user && config.pass) var dbURI = 'mongodb://'+config.user+':'+config.pass+'@'+dbHost+'/'+dbName; 
else dbURI = 'mongodb://'+config.dbHost+'/'+config.dbName; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
