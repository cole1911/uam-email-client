module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['src/app/**/*.js', 'test/**/*.spec.js'],
      options: {
        // options here to override JSHint defaults
        jshintrc: true
      }
    },
    watch: {
    	files: ['src/app/**/*.js','src/views/**/*'],
    	tasks: ['jshint','includeSource'],
  	},
  	includeSource: {
    	options: {
    		basePath: 'src',
    		baseUrl: 'src/'
    	},
    	myTarget: {
     		files: {
     			'index.html': 'src/index.tpl.html'
     		}
     		// Target-specific file lists and/or options go here.
    	}
  	}
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-source');

};