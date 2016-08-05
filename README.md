# Socket IO Chat

### Directory Structure
```
root
|---public	    	    	//front-end source
|   |---css     			//style.css is compiled using grunt
|   |   |---sass
|   |       |---base
|   |       |---components
|   |       |---helpers
|   |       |---layout
|   |       |---pages
|   |       |---vendor
|   |---fonts               //bootstrap glyphicon fonts
|   |---js  	    		//angular source files
|   |   |---components
|   |   |---controllers
|   |   |---directives
|   |   |---services        //factories and services
|   |---partials			//empty for now
|   |---views               //html templates created from pug templates
|       |---pug			    //pug templates for angular components
|---config  			//sets app port, mongo credentials, etc
|---controllers			//server-side
|---models				//mongo models and helper functions
|---routes              
|---test
|   |---unit
|---views               //pug files for server side views
|   |---includes
```

### npm

##### npm start
 - Starts Server

##### npm stop
 - Stops Server

##### npm test
 - Runs Karma tests


### Technologies used
 - AngularJS 1.5
 - Bootstrap 3
 - Sass
 - Pug

### TODO:

 - Finish writing unit tests
 - Add list of users in each room
 - Figure out what to do with chat window close button (currently not implemented)
