'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	var path = require('path').resolve(dir);
	console.log(path);
	return connect.static(path);
};


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

	// configurable paths
	var appConfig = {
		app: 'htdocs'
	};


	grunt.initConfig({
		config: appConfig,

        watch: {
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/scripts/src/**/*.js',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
			test: {
				files: ['<%= config.app %>/scripts/**/*.js'],
				tasks: ['test']
			}
        },

        clean: {
            server: '.tmp',
			dist: ['<%= config.app %>/scripts/main.js','<%= config.app %>/scripts/main.js.map']
        },

		// Testing Tools
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/src/**/*.js',
                '!<%= config.app %>/scripts/src/config.js',
				// no tests on external code,
				// won't make you happy
                '!<%= config.app %>/scripts/src/vendor/**/*.js'
           //     'test/{,*/}*.js'
            ]
        },

		qunit: {
			//all: ['test/qunit/**/*.html']
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
					// Pipe output console.log from your JS to grunt. False by default.
					log: true,

					// Select a Mocha reporter
					// http://visionmedia.github.com/mocha/#reporters
					reporter: 'Spec',
					//reporter: 'Landing',
					urls: ['http://localhost:<%= connect.options.port %>/test/mocha.html']
				}
			}
		},

		jasmine: {
			all: {
				//src: 'scripts/src/**/*.js',
				options: {
					specs: '<%= config.app %>/test/jasmine/spec/*Spec.js',
					host: 'http://localhost:<%= connect.options.port %>/',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: '<%= config.app %>/scripts/src/config.js',
						requireConfig: {
							baseUrl: '<%= config.app %>/scripts/src/'
						}
					}
				}
			}
		},


        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl                 : '<%= config.app %>/scripts/src',
                    name                    : 'vendor/requirejs/require',
                    include                 : 'main',
                    out                     : '<%= config.app %>/scripts/main.js',
                    mainConfigFile          : '<%= config.app %>/scripts/src/config.js',
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
                rjsConfig: '<%= config.app %>/scripts/src/config.js'
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
							mountFolder(connect, '.tmp'),
							mountFolder(connect, appConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, appConfig.app),
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

    grunt.registerTask('tsest', [
        'jshint:all',
		'qunit:all',
		'connect:mocha',
		'mocha'
    ]);

    grunt.registerTask('build', [
        'bower',
        'requirejs'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
