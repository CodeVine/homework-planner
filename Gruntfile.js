'use strict';

var _ = require('lodash');
var desireds = require('./tests/settings/desireds');
require('colors');

var gruntConfig = {
        env: {
            // dynamically filled
        },
        simplemocha: {
            sauce: {
                options: {
                    timeout: 60000,
                    reporter: 'spec'
                },
                src: ['tests/main.js']
            }
        },
        concurrent: {
            'test-sauce': [], // dynamically filled
        },
        jshint: {
            check: {
                src: ['*.js', 'src/js/*.js']
            }
        },
    };
 
_(desireds).each(function(desired, key) {
    gruntConfig.env[key] = { 
        DESIRED: JSON.stringify(desired)
    };
    gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

module.exports = function(grunt) {
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-saucelabs');

    // Default task.
    grunt.registerTask('test', ['test:sauce:' + _(desireds).keys().first()]);

    _(desireds).each(function(desired, key) {
            grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
    });

    grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);
};