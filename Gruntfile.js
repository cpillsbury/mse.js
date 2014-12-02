'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
            ' Licensed <%= pkg.license %> */\n',
        clean: {
            files: ['dist']
        },
        browserify: {
            dist: {
                src: 'src/mse.js',
                dest: 'dist/mse.js'
            },
            dev: {
                src: 'src/mse.js',
                dest: 'dist/mse-debug.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    node: true
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= browserify.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            },
            dev: {
                src: '<%= browserify.dev.dest %>',
                dest: 'dist/<%= pkg.name %>-debug.min.js'
            }
        },
        watch: {
            files: 'src/*',
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['clean', 'jshint', 'browserify', 'uglify', 'watch']);
    // TODO: Handle clean (update clean task params)
    grunt.registerTask('dev', ['jshint', 'browserify:dev', 'uglify:dev', 'watch']);
};