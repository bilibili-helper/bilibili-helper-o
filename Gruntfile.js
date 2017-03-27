/* eslint-env node */

module.exports = function(grunt) {
    grunt.loadNpmTasks('gruntify-eslint');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            src: ['Gruntfile.js', 'src/**/*.js', '!src/**/*.min.js'],
        },
        babel: {
            options: {
                'sourceMap': false,
                'presets': ['es2015'],
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js', '!**/*.min.js'],
                    ext: '.min.js',
                    dest: 'dest/',
                }],
            },
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: false,
                },
                files: [{
                    expand: true,
                    src: ['dest/**/*.min.js'],
                }],
            },
        },
        htmlmin: {
            main: {
                options: {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.html'],
                    dest: 'dest/',
                    ext: '.html',
                }],
            },
        },
        cssmin: {
            main: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1,
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'dest/',
                    ext: '.min.css',
                }],
            },
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/**', '!**/*.html', '!**/*.js', '**/*.min.js', '!**/*.css', '**/*.min.css', '_locales/**'],
                    dest: 'dest/',
                }],
            },
        },
        compress: {
            main: {
                options: {
                    archive: 'bilibili_helper.zip',
                },
                files: [{
                    expand: true,
                    cwd: 'dest/',
                    src: ['**/*'],
                    dest: '/',
                }],
            },
        },
    });

    grunt.registerTask('default', ['eslint', 'babel', 'uglify', 'htmlmin:main', 'cssmin:main', 'copy:main', 'compress:main']);
    grunt.registerTask('debug', ['eslint', 'babel', 'htmlmin:main', 'cssmin:main', 'copy:main']);
};
