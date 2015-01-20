
/**
 * Log some message
 */
DEBUGGER.addMethod("log", function(Vars){


	this.print(Vars.moduleNameCall, Vars.default, "log");
	return true;
	

});


/**
 * Warn some message
 */
DEBUGGER.addMethod("warn", function(Vars){


	this.print(Vars.moduleNameCall, Vars.default, "warn");
	return true;
	

});

/**
 * Show error message
 */
DEBUGGER.addMethod("error", function(Vars){


	this.print(Vars.moduleNameCall, Vars.default, "error");
	return true;
	

});


/**
 * Info some message
 */
DEBUGGER.addMethod("info", function(Vars){


	this.print(Vars.moduleNameCall, Vars.default, "info");
	return true;
	
});