module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        qunit: {
            files: ['tests/index.html']
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Task to run tests
    grunt.registerTask('test', 'qunit');
};
