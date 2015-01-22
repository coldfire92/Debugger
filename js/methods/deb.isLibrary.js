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
