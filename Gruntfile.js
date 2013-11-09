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
                        'window',
                        'document'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'jquery.listfilter.js',
                    'tests/tests.js'
                ],
                tasks: ['test'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jslint');

    // Task to run tests
    grunt.registerTask('test', ['jslint', 'qunit']);
};
