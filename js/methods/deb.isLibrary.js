/**
 * test if file with current library added
 * @param  {string} Library
 * @return {void} 
 */
 DEBUGGER.addMethod("isLibrary", function(Vars){
     
      return (typeof window[Vars.Library] !== "undefined") ? true : false;

},["Library"]);
