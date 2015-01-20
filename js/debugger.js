
/**
 * Simple modular object to debbug code (ex. showing in console, creating logs etc.)
 */
DEBUGGER = (function(){

	"use strict";
		
	/*-----  Vars  ------*/
	
	var	methods = {};


	/*-----  Methods available in this object in additionals methods  ------*/

	var utilsMethods = {


		/**
		 * Print messages in console, DOM or log file
		 * @param  {string} module  module name
		 * @param  {string} message 
		 * @param  {string} type    message type {log,warn,info,error}
		 * @param  {bool} plain   dont print module name
		 * @return {void}  
		 */
		print : function(module, message, type, plain){

			var methods = ["log","warn","info","error"];	
			plain = plain || false;

			type = (type || methods.indexOf(type) == -1) ? type : "log";

			var messageConsole = (!plain) ? (module + "| " + message) : message;

			console[type].call(console, messageConsole);

		}


	};


	/**
	 * This is run when user call 'run' mwethod
	 * @param  {string} moduleName module name
	 * @param  {string} method    
	 * @param  {mixed} Vars       
	 * @return {bool} is test pass
	 */
	var runMethod = function(moduleName, method, Vars){

			var varTypesAppropriate = ['string','number','string','function'];
			
			// if not apply object create object and set apply value to default property
			if(varTypesAppropriate.indexOf(typeof Vars) !== -1) {
				var newVar = {default: Vars};
				Vars = newVar;
			}

			if(typeof methods[method] == "undefined"){

				utilsMethods.print(moduleName, "Can`t call debugger method: " + method + "", "warn");
				return null;

			}

			/*-----  Filter vars  ------*/
			
			if(typeof Vars != "undefined"){

				Vars.moduleNameCall = moduleName; //  add which module call method

			} else {

				Vars.moduleNameCall  = moduleName;

			}

			/*-----  Run method  (test passed arguments) ------*/
			
			if(testDebuggerMethod(method, methods[method].requiredVars, Vars)) {


				return isMethotReturnBool(method, methods[method].method.call(utilsMethods, Vars));	

			}

			return null;

	};


	/**
	 * Check if all vars are passed to debugger method
	 * @param  {object} requiredVars 
	 * @param  {object} Vars         
	 * @return {bool}             
	 */
    var testDebuggerMethod = function(methodName, requiredVars, Vars){

    	var ret = true;

    	requiredVars = requiredVars || ["default"]; // if not specify required Vars, required only default


    	[].forEach.call(requiredVars, function(cur_var){
    	
    		if(typeof Vars[cur_var] == "undefined"){

    			utilsMethods.print("Debugger:methods", "You dont pass '" + cur_var + "' argument to debugger method '" + methodName + "'", "warn");
    			ret = false;
    			return;
    		}
    	
    	});

    	return ret;

    };

    /**
     * Chech if debugger method return bool
     * @param  {string}  name [description]
     * @param  {mixed}  ret  what return method
     * @return {Boolean}    
     */
    var isMethotReturnBool = function(methodName, ret){


    	if(typeof ret == "undefined"){

    		utilsMethods.print("Debugger:isMethotReturnBool", "Debugger Method '"+methodName+"' dont return bool","warn");

    		return true;
    	}

    	return ret;


    };


	/*-----  Public functions  ------*/
	

	return {

		/**
		 * Add new method to debbuger
		 * @param {string} name   
		 * @param {function} method 
		 * @param {array} vars required vars in method
		 */
		addMethod: function(name, method, vars){

			methods[name] = {

				method: method,
				requiredVars: vars

			};

		},

		/**
		 * Show all available methods
		 * @return {void} 
		 */
		showMethods: function(){

			
			utilsMethods.print("debugger", methods, "log", true);

			
		},

		/**
		 * Run method
		 * @param  {string} method     
		 * @param  {mixed} Vars       
		 * @param  {string} moduleName use to print moduleName in conole or in log file
		 * @return {bool} return from mehod, is pass test or now      
		 */
		run: function(method, Vars, moduleName){

			moduleName = moduleName || "main";

			return runMethod(moduleName, method, Vars);
		

		}

	};


})();