'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	var path = require('path').resolve(dir);
	return connect.static(path);
};

var gateway = require('gateway');


module.exports = function (grunt) {

	// show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

	// configurable paths
	var appConfig = {
		dist: 'htdocs',
		src: 'htdocs'
	};


	grunt.initConfig({
		config: appConfig,
		watch: {
			bower: {
				files: ['<%= config.src %>/scripts/src/vendor/**/*.js'],
				tasks: ['bower']
			},
			javascript: {
				files: [
					'<%= config.src %>/scripts/src/**/*.js',
					'!<%= config.src %>/scripts/src/vendor'
				],
				tasks: ['jshint']
			},
			//styles: {
			//	files: ['<%= config.dist %>/styles/{,*/}*.css'],
			//	tasks: ['copy:styles', 'autoprefixer']
			//},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= config.src %>/{,*/}*.html',
					'<%= config.src %>/{,*/}*.php',
					'<%= config.src %>/scripts/src/{,*/}*.js',
				//	'<%= config.src %>/styles/{,*/}*.{css,less,scss,sass}',
				//	'<%= config.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

        clean: {
            server: '.tmp',
			dist: ['<%= config.dist %>/scripts/main.js','<%= config.dist %>/scripts/main.js.map'],
			bower: ['<%= config.dist %>/scripts/src/vendor/*']
        },

		// Testing Tools
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.src %>/scripts/src/**/*.js',
                '!<%= config.src %>/scripts/src/config.js',
				// no tests on external code,
				// won't make you happy
                '!<%= config.src %>/scripts/src/vendor/**/*.js'
           //     'test/{,*/}*.js'
            ]
        },

		qunit: {
			all: {
				options: {
					// Pipe output console.log from your JS to grunt. False by default.
					log: true,
					urls: ['http://localhost:<%= connect.options.port %>/test/qunit.html']
				}
			}
		},

		mocha: {
			all: {
				options: {
					log: true,
					// Select a Mocha reporter
					// http://visionmedia.github.com/mocha/#reporters
					// Pipe output console.log from your JS to grunt. False by default.
					reporter: 'Spec',
					urls: ['http://localhost:<%= connect.options.port %>/test/mocha.html']
				}
			}
		},

		jasmine: {
			all: {
				options: {
					specs: '<%= config.src %>/test/jasmine/spec/*Spec.js',
					host: 'http://localhost:<%= connect.options.port %>/',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: '<%= config.src %>/scripts/src/config.js',
						requireConfig: {
							baseUrl: '<%= config.src %>/scripts/src/'
						}
					}
				}
			}
		},


        requirejs: {
            all: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl                 : '<%= config.src %>/scripts/src',
                    name                    : 'vendor/requirejs/require',
                    include                 : 'main',
                    out                     : '<%= config.dist %>/scripts/main.js',
                    mainConfigFile          : '<%= config.src %>/scripts/src/config.js',
                    preserveLicenseComments : false,
                    useStrict               : true,
                    wrap                    : true,
                    optimize                : 'uglify2',
                    generateSourceMaps      : true,
                    useSourceUrl            : true
                }
            }
        },

        bower: {
            options: {
                exclude: ['modernizr','qunit','mocha','chai']
            },
            all: {
                rjsConfig: '<%= config.src %>/scripts/src/config.js'
            }
        },

		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							gateway(__dirname + '/' + appConfig.src, {
								'.php': 'php-cgi'
							}),
							mountFolder(connect, appConfig.src),
							mountFolder(connect, '.')
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							gateway(__dirname + '/' + appConfig.src, {
								'.php': 'php-cgi'
							}),
							mountFolder(connect, appConfig.src),
							mountFolder(connect, '.')
						];
					}
				}
			},

			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, appConfig.dist),
							mountFolder(connect, '.')
						];
					}
				}
			}
		}
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'connect:livereload',
			'open',
			'watch'
        ]);
    });



	grunt.registerTask('test',  function () {
		grunt.task.run(['jshint:all']);

		// testserver
		grunt.task.run(['clean:server', 'connect:test']);

		// mocha
		grunt.task.run(['mocha']);

		// jasmine
		grunt.task.run(['jasmine']);

		// qunit
		grunt.task.run(['qunit']);
	});

    grunt.registerTask('build', [
        'bower',
        'requirejs'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
