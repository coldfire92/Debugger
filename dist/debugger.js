
/**
 * Simple modular object to debbug code (ex. showing in console, creating logs etc.)
 */
DEBUGGER = (function(){

	"use strict";
		
	/*-----  Vars  ------*/
	
	var	methods = {};
	var	objects = {}; // objects for methods


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

		},



		/**
		 * Set 'global' object to debugger
		 * @param {string} key        
		 * @param {mixed} object     
		 * @param {string} methodName 
		 */
		setObject: function(key, object, methodName){

			methodName = methodName || 'Debugger:setObject';


			if(!key){
				this.print(methodName, "You try set object but you not apply 'key' argument", "warn");
				return false;
			}


			if(!object){
				this.print(methodName, "You try set object in "+key+" key but not apply 'object argument'", "warn");
				return false;
			}

			objects[key] = object;

			return true;

		},

		/**
		 * Delete 'global' object for debugger
		 * @param  {string} key        
		 * @param  {string} methodName 
		 * @return {bool}          
		 */
		deleteObject: function(key, methodName){

			methodName = methodName || 'Debugger:deleteObject';

			if(!key){
				this.print(methodName, "You try delete object but you not apply 'key' argument", "warn");
				return false;
			}

			delete objects[key];

			return true;

		},

		/**
		 * Get 'global' object for debugger	
		 * @param  {string} key      
		 * @param  {string} methodName 
		 * @return {mixed} 
		 */
		getObject: function(key, methodName){

			methodName = methodName || 'Debugger:getObject';

			if(!objects[key]){
				this.print(methodName, "It`s not exist object with '"+key+"' key", "warn");

				return null;
			}

			return objects[key];

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
/**
 * test if file with current library added
 * @param  {string} Library
 * @return {void} 
 */
 DEBUGGER.addMethod("isLibrary", function(Vars){
     
       if(typeof window[Vars.Library] !== "undefined") return true;

       	this.print("isLibrary", "You dont include "+Vars.Library+" library", "error");
       	
       	return false;
        

},["Library"]);
