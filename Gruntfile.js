
module.exports = function(grunt){

	  grunt.initConfig({


	  	 concat: {
		    basic_and_extras: {
		      files: {
		        'dist/debugger.js': ['js/debugger.js','js/methods/*.js'],
		      },
		    },
 		 }

	  });
	
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.registerTask('default', ['concat']);

};