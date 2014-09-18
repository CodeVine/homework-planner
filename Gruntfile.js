'use strict';

var gruntConfig = {
    concat: {
        dist: {
            src: ['tests/base.js', 'tests/src/*.js', 'tests/endline.js'],
            dest: 'tests/test.js'
        }
    },
    simplemocha: {
        sauce: {
            options: {
                timeout: 60000,
                reporter: 'spec'
            },
            src: ['tests/test.js']
        }
    },
    jshint: {
        check: {
            src: ['*.js', 'src/js/*.js']
        }
    },
};

module.exports = function(grunt) {
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task.
    grunt.registerTask('test', ['concat', 'simplemocha']);
};