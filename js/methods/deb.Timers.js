/* global DEBUGGER */ 

/**
 * start timer count
 * @param  {string} id
 * @return {void} 
 */
 DEBUGGER.addMethod('startTimer', function(Vars){

 	'use strict';

      var date = new Date().valueOf();

      this.setObject(Vars.default, date);
     
      return true;

});


/**
 * stop timer count
 * @param  {string} key
 * @return {string} get time with ms ex. 500ms  
 */
DEBUGGER.addMethod('stopTimer', function(Vars){

 	'use strict';

	var time = new Date().valueOf() - this.getObject(Vars.default);

	this.deleteObject(Vars.default);
		
    return time + 'ms'; 

});