// Generated on 2013-10-09 using generator-webapp 0.4.3
'use strict';

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

    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,js/**/*.js',
                    'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
			test: {
				files: ['scripts/**/*.js'],
				tasks: ['test']
			}
        },

        clean: {
            server: '.tmp',
			dist: ['scripts/main.js','scripts/main.js.map']
        },

		// Testing Tools
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'scripts/src/**/*.js',
				// no tests on external code,
				// won't make you happy
                '!scripts/src/vendor/**/*.js'
           //     'test/{,*/}*.js'
            ]
        },

		qunit: {
			all: ['test/**/*.html']
		},


        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl                 : 'scripts/src',
                    name                    : 'vendor/requirejs/require',
                    include                 : 'main',
                    out                     : 'scripts/main.js',
                    mainConfigFile          : 'scripts/src/main.js',
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
                exclude: ['modernizr','qunit']
            },
            all: {
                rjsConfig: 'scripts/src/main.js'
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '.'
                    ]
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


    grunt.registerTask('test', [
        'jshint:all',
		'qunit:all'
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
