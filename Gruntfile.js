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
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    // Task to run tests
    grunt.registerTask('test', ['jslint', 'qunit']);

    // Task to build
    grunt.registerTask('build', ['jslint', 'qunit', 'uglify']);
};
