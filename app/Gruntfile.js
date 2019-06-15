'use strict';

module.exports = function(grunt) {
	grunt.initConfig({

		ngconstant: {
			// Options for all targets
			options: {
				space: '  ',
				wrap: '"use strict";\n\n {\%= __ngModule %}',
				name: 'config'
			},
			// Environment targets
			development: {
				options: {
				  dest: 'app/temp/config.js',
				},
				constants: {
				  ENV: {
				    name: 'development',
					siteURL: 'http://pockits-app',
					apiURL: 'http://pockits-app/app/api',
				    appURL: 'http://pockits-app/app'
				  }
				}
			},
			production: {
				options: {
				  dest: 'app/temp/config.js',
				},
				constants: {
				  ENV: {
				    name: 'production',
					siteURL: 'https://www.pockits.co',
				    apiURL: 'https://www.pockits.co/app/api',
				    appURL: 'https://www.pockits.co/app'
				  }
				}
			}
		},

		html2js: {
			main: {
				options: {
				  // custom options, see below
				  base: 'app/modules/',
				  module: 'templates',
				  singleModule: true,
				  useStrict: true,
				},
				src: ['app/modules/**/*.tpl.html'],
				dest: 'app/temp/templates.js'
			},
		},

		concat: {
			dist: {
				src: [
					'node_modules/underscore/underscore.js',
					'node_modules/angular/angular.min.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/angular-cookies/angular-cookies.min.js',
					'node_modules/angular-messages/angular-messages.min.js',
					'node_modules/angular-route/angular-route.min.js',
					'node_modules/angular-resource/angular-resource.min.js',
					'node_modules/angular-local-storage/dist/angular-local-storage.js',
					'node_modules/angulartics/dist/angulartics.min.js',
					'node_modules/angulartics-google-analytics/dist/angulartics-ga.min.js',
					'node_modules/angular-loading-bar/build/loading-bar.min.js',
					'app/temp/templates.js',
					'app/temp/config.js',
					'app/modules/routes.js',
					'app/modules/payments/payments.js',
					'app/modules/users/authenticate.js',
					'app/modules/dashboard/dashboard.js',
					'app/modules/app.js'
					],
				dest: 'assets/js/app.js',
			}
		},
		less: {
		  production: {
		    options: {
		      paths: ["app/less"],
		      optimization: 2,
		      compress: true,
		      sourceMap: true,
		      sourceMapFilename: 'assets/css/styles.css.map',
		      sourceMapURL: 'build.css.map',
		      sourceMapBasepath: 'assets/css/'
		    },
		    files: {
		      "assets/css/styles.css": "app/less/styles.less"
		    }
		  }
		},
		watch: {
	    	js: {
		      	files: [
		      	'app/modules/**/*.js',
		      	'app/directives/*.js',
		      	'app/misc/*.js',
		      	'app/filters/*.js',
		      	'app/filters/**/*.js',
		      	'app/config/*.js',
		      	'app/modules/**/*.tpl.html'
		      	],
				tasks: ['html2js', 'concat'],
			},
			less: {
				files: [
					'app/less/*.less',
					'app/less/**/*.less'
				],
				tasks: ['less'],
			},
			options: {
				livereload: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['ngconstant:development', 'less:production', 'html2js:main', 'concat:dist', 'watch']);
    grunt.registerTask('production', ['ngconstant:production', 'html2js:main', 'concat:dist']);

}
