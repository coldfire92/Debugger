/**
 * Debugger for framework
 *  
 * @type {[type]}
 */
DEBUGGER = (function(){

	"use strict";
		
	/*-----  Vars  ------*/
	
	var	methods = {};


	/*-----  Utils for methods  ------*/
	
	
	var utilsMethods = {

		print : function(module, message, type, plain){

			var methods = ["log","warn","info","error"];	
			plain = plain || false;

			type = (type || methods.indexOf(type) == -1) ? type : "log";

			var messageConsole = (!plain) ? (module + "| " + message) : message;

			console[type].call(console, messageConsole);

		},


		runMethod: function(moduleName, method, Vars){

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

		},


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

		addMethod: function(name, method, vars){

			methods[name] = {

				method: method,
				requiredVars: vars

			};

		},

		showMethods: function(){

			
			utilsMethods.print("debugger", methods, "log", true);

			
		},

		call: function(method, Vars, moduleName){

			moduleName = moduleName || "main";

			return utilsMethods.runMethod(moduleName, method, Vars);
		

		}

	};


})();