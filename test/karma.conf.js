// Karma configuration
// Generated on Thu Jul 07 2016 06:47:05 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../public/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	  'bower_components/angular/angular.js',
	  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
	  'bower_components/angular-resource/angular-resource.js',
      	  'bower_components/angular-mocks/angular-mocks.js',
	  'bower_components/jasmine/lib/jasmine-core/jasmine.js',
	  'bower_components/jquery/dist/jquery.js',
	  'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
	  'bower_components/angular-md5/angular-md5.min.js',
	  'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
	  'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	  'js/ngapp.js',
	  'js/*.js',
	  'js/**/*.js',
	  '../test/unit/**/*spec.js',
	  'views/**/*.html',
	  'views/*.html',
	  'partials/*.html',
	  'partials/**/*.html'
    ],

    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		"views/**/*.html": ["ng-html2js"],
		"views/*.html": ["ng-html2js"],
		"partials/*.html": ["ng-html2js"],
		"partials/**/*.html": ["ng-html2js"]
    },

	ngHtml2JsPreprocessor: {
//		stripPrefix: "views",
//		prependPrefix: "/",
		cacheIdFromPath: function(filepath) {
			console.log('filepath',filepath);
			if (filepath.search(/views/)!==-1) {
				filepath = '/'+filepath;
			}
			var cacheId = filepath;
			return cacheId;
		},
		moduleName: "my.templates"
	},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

	plugins: [	'karma-chrome-launcher',
				'karma-firefox-launcher',
				'karma-jasmine',
				'karma-ng-html2js-preprocessor',
				'karma-html2js-preprocessor'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
