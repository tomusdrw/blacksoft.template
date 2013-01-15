/*global module:false*/
module.exports = function(grunt) {
    var noVendorFiles = function(files) {
        return grunt.file.expandFiles(files).filter(function(x) {
			return x.indexOf('/vendor/') === - 1;
	    });
    };

	// Project configuration.
	grunt.initConfig({
        project : "<json:project.json>",
		meta: {
			banner: '/*! <%=project.name %> - v<%= project.version %> - ' //
                  + '<%= grunt.template.today("yyyy-mm-dd") %>\n' //
                  + '* <%= project.website %>\n' //
                  + '* Copyright (c) <%= grunt.template.today("yyyy") %> ' //
                  + '<%= project.author %>; Licensed <%= project.license %> */'
		},
		lint: {
			files: noVendorFiles(['grunt.js', 'src/**/*.js', 'tests/**/*.js'])		
        },
		mocha: {
			index: ['tests/index.html']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'quality'
		},
        /* Building */
        cssmin : {
            app : {
                src: grunt.file.expandFiles('src/css/**/*.css'),
                dest : 'dist/css/combined-<%= project.version %>.min.css'
            }
        },
        useref : {
            html: 'dist/*.html',
            temp: 'dist'
        },
		requirejs: {
			compile: (function() {
				var buildOpts = {
					appDir: "src",
					baseUrl: "js",
					dir: "dist",
					modules: [{
						name: "main"
					}]
				};

				// Load config file
				var configStr = grunt.file.read('src/js/config.js');

                // Eval is evil!
                eval(configStr);
                var config = require;
                var k;
                for (k in buildOpts) {
                    if (buildOpts.hasOwnProperty(k)) {
                        config[k] = buildOpts[k];
                    }
                }
                return config;
			} ())
		},
        min : {
            dist : {
                // TODO those paths are also defined in index.html. There should be only one definition.
                src: ['<banner>', 'dist/js/config.js', 'dist/js/vendor/require-jquery-2.1.2.js', 'dist/js/main.js'],
                dest: 'dist/js/combined-<%= project.version %>.min.js'
            }
        },
		uglify: {},
        /* Lint options */
        csslint: {
            app : {
                src : noVendorFiles(['src/css/**/*.css']),
                rules : {
                    "adjoining-classes": false,
                    "box-model": false
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
			globals: {
				'define': true,
				'require': true,
				'requirejs': true,
				/* For tests only! */
				'describe': true,
				'it': true,
				'beforeEach': true
			}
		}
	});

	// R.js support
	grunt.loadNpmTasks('grunt-requirejs');
	// Mocha + PhantomJS runner
	grunt.loadNpmTasks('grunt-mocha');
	// Minifiy and concat css & js
	grunt.loadNpmTasks('grunt-useref');

	// Default tasks
	grunt.registerTask('quality', 'lint csslint mocha');
	grunt.registerTask('build_nolint', 'requirejs min cssmin useref');

	// Build
	grunt.registerTask('build', 'quality build_nolint');

};
