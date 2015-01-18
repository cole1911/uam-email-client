module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['app/js/**/*.js', 'test/**/*.spec.js'],
      options: {
        // options here to override JSHint defaults
        jshintrc: true
      }
    },
    watch: {
    	files: ['**/*'],
    	tasks: ['jshint','includeSource'],
  	},
  	includeSource: {
    	options: {
    		basePath: '',
    		baseUrl: ''
    	},
    	myTarget: {
     		files: {
     			'app/index.html': 'app/dev/index.tpl.html'
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