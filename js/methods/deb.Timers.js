 
/**
 * start timer count
 * @param  {string} id
 * @return {void} 
 */
 DEBUGGER.addMethod("startTimer", function(Vars){

      var date = new Date().valueOf();

      this.setObject(Vars.default, date);
     
      return true;

});


/**
 * stop timer count
 * @param  {string} key
 * @return {string} get time with ms ex. 500ms  
 */
DEBUGGER.addMethod("stopTimer", function(Vars){

	var time = new Date().valueOf() - this.getObject(Vars.default);

	this.deleteObject(Vars.default);
		
    return time + 'ms'; 

});