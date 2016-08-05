module.exports = function(grunt) {
	
	// Project configuration
	grunt.initConfig({
		connect: {
			options: {
				port:9000,
				hostname:'localhost',
				livereload:35732
			}
		},
		pkg: grunt.file.readJSON('package.json'),
        // Concatenate all the JavaScript files
		concat: {
			files: {
				src: ['public/js/**/*.js' ],
				dest: 'public/concat/allAppCode.concat.js'
			}
		},
        // Minify the concatenated files
		uglify: {
			options: {
				report: 'min',
				mangle: false
			},
			files: {
				src: 'public/concat/allAppCode.concat.js',
				dest: 'public/src/allAppCode.min.js'
			}
		},
        // Check for syntax errors in all the JavaScript files
		jshint: {
			all: ['public/**/*.js', '!public/bower_components/**'],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				laxbreak: true,
				laxcomma: true,
				globals: {
					jQuery: true,
					angular: true
				}
			}
		},
        // Compile scss files into css
		sass: {
			dist: {
				options: {
					sourceMap: true,
					style: 'compressed'
				},
				files: {
					'public/css/style.css': 'public/css/sass/style.scss'
				}
			}
		},
		// Compile pug files into html
		pug: {
			compile: {
				options: {
					data: {
						debug: true
					},
					pretty: true,	
				},
				files: [
					{
						expand: true,
						cwd: 'public/views/pug',
						src: ['**/*.pug'],
						dest: 'public/views/',
						rename: function(dest,src) {
							var genFile = dest+src.replace('pug','html');
							console.log('created: ',genFile);
							return genFile;
						},
					},
				],
			},
		},
		
        /* Connect to localhost:3000
		connect: {
			server: {
				options: {
					open: true,
					base: '.',
					livereload: true
				}
			},
			misc: {
				options: {
					open: true,
					livereload: true
				}
			}
		},*/
        // Watch for changes made in the files below and run the assigned task
		watch: {
			options: {
				livereload: 35732,
			},
			js: {
				files: ['public/**/*.js','!public/bower_components/**'],                                         // Files to watch
				tasks: ['jshint'],      // Tasks to run when watched files change
				event: 'all'
			},
			pug: {
				files: ['public/views/**/*.pug'],
				tasks: ['pug'],
				event: 'all'
			},
			css: {
				files: ['public/stylesheets/**/*.scss'],
				tasks: ['sass'],
				event: 'all'
			},
			sass: {
				files: ['public/css/sass/**/*.{scss,sass}'],
				tasks: ['sass:dist'],
				event: 'all'
			},
		},
	});

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['jshint', 'sass:dist', 'pug','watch']);
	grunt.registerTask('run-jshint', ['jshint']);
	grunt.registerTask('run-sass',['sass']);
	grunt.registerTask('run-pug',['pug']);
	grunt.registerTask('makeMinFile',['jshint','concat','uglify']);
};
