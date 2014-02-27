module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        qunit: {
            files: ['tests/index.html']
        },
        jslint: {
            client: {
                src: [
                    'jquery.listfilter.js',
                    'tests/tests.js'
                ],
                directives: {
                    browser: true,
                    unparam: true,
                    predef: [
                        'jQuery',
                        '$',
                        'ok',
                        'test',
                        'equal',
                        'start',
                        'stop',
                        'window',
                        'document'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                src: 'jquery.listfilter.js',
                dest: 'jquery.listfilter.min.js'
            }
        },
        watch: {
            scripts: {
                files: [
                    'jquery.listfilter.js',
                    'tests/tests.js'
                ],
                tasks: [
                    'test',
                    'build'
                ],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            }
        },
        connect: {
            app: {
                options: {
                    base: '.',
                    port: 9000,
                    hostname: 'localhost',
                    open: 'http://localhost:9000/tests/index.html',
                    livereload: 35729,
                    debug: true
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Task to run tests
    grunt.registerTask('test', [
        'jslint',
        'qunit'
    ]);

    // Task to build
    grunt.registerTask('build', [
        'test',
        'uglify'
    ]);

    // Server task
    grunt.registerTask('server', [
        'build',
        'connect',
        'watch'
    ]);

    // Default task
    grunt.registerTask('default', [
        'build'
    ]);
};
