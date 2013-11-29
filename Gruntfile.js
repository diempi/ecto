/* ecto
 * Simple/fast node.js blogging system.
 *
 * JS Document - /Gruntfile.js
 * Grunt Tasks
 *
 * coded by leny
 * started at 02/09/13
 */

"use strict";

module.exports = function( grunt ) {

    grunt.initConfig( {
        "pkg": grunt.file.readJSON( "package.json" ),
        "bumpup": "package.json",
        "concurrent": {
            "options": {
                "logConcurrentOutput": true
            },
            "tasks": [
                "nodemon",
                "watch"
            ]
        },
        "jshint": {
            "files": [
                "server/**/*.js",
                "client/js/parts/**/*.js"
            ],
            "options": {
                "boss": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "es5": true,
                "immed": true,
                "indent": 4,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "node": true,
                "noempty": true,
                "quotmark": "double",
                "sub": true,
                "undef": true,
                "unused": true,
                "white": false
            }
        },
        "uglify": {
            "admin": {
                "options": {
                    "banner": "/* ecto\n * Simple/fast node.js blogging system.\n *\n * JS Document - /client/js/admin.min.js\n * Client Scripts for Admin\n *\n * coded by leny\n * started at 10/09/13\n * builded at <%= grunt.template.today('dd/mm/yyyy') %>\n */\n\n"
                },
                "files": {
                    "client/js/admin.min.js": [ "client/js/libs/jquery.js", "client/js/parts/admin.js" ]
                }
            }
        },
        "nodemon": {
            "server": {
                "options": {
                    "debug": true,
                    "file": "server/server.js",
                    "watchedExtensions": [
                        "js",
                        "jade"
                    ],
                    "watchedFolders": [
                        "server"
                    ],
                    "legacyWatch": true
                }
            }
        },
        "watch": {
            "files": [
                "server/**/*.js",
                "server/**/*.jade",
                "client/js/parts/**/*.js"
            ],
            "tasks": [
                "clear",
                "jshint",
                "uglify",
                "bumpup:build"
            ]
        }
    } );

    grunt.loadNpmTasks( "grunt-clear" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-bumpup" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-nodemon" );
    grunt.loadNpmTasks( "grunt-concurrent" );

    grunt.registerTask( "default", [
        "clear",
        "jshint",
        "uglify",
        "bumpup:build"
    ] );

    grunt.registerTask( "check", [
        "jshint"
    ] );

    grunt.registerTask( "work", [
        "clear",
        "concurrent"
    ] );

    grunt.registerTask( "patch", [
        "clear",
        "jshint",
        "uglify",
        "bumpup:patch"
    ] );

    grunt.registerTask( "minor", [
        "clear",
        "jshint",
        "uglify",
        "bumpup:minor"
    ] );

    grunt.registerTask( "major", [
        "clear",
        "jshint",
        "uglify",
        "bumpup:major"
    ] );

};
