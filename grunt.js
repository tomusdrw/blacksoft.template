/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
    lint: {
        files: grunt.file.expandFiles(['grunt.js', 'src/**/*.js', 'tests/**/*.js']).
          filter(function(x) {
            return x.indexOf('/vendor/') === -1;
          })
    },
    qunit: {
      files: ['tests/**/*.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
	requirejs : {
        compile : {
            appDir: "src",
            baseUrl: "js",
            dir: "dist",
            modules : [
              {
                name: "main"
              }
            ],
            paths : {
                'bootstrap' : 'vendor/bootstrap-2.2.2',
                'underscore' : 'vendor/underscore-1.4.3',
                'backbone' : 'vendor/backbone-0.9.9',
                'backbone.storage' : 'vendor/backbone.webStorage'
            },
            map : {
                '*' : {
                    '_' : 'underscore'
                }
            },
            shim : {
                'underscore' : {
                    exports : '_'
                },
                'backbone' : {
                    deps : ['underscore'],
                    exports : 'Backbone'
                },
                'backbone.storage' : {
                    deps : ['backbone'],
                    exports : 'Backbone'
                },
            }
        }
	},
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            boss: true,
            eqnull: true,
            browser: true
        },
        globals : {
            'define': true,
            'require': true, 
            'requirejs': true,
            /* For tests only! */
            'describe': true,
            'it': true,
            'beforeEach': true
        }
    },
    uglify: {}
  });

  // R.js support
  grunt.loadNpmTasks('grunt-requirejs');

  // Default task.
  grunt.registerTask('default', 'lint qunit');

};
