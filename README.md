#Debugger
Simple modular object to debbug code (ex. showing in console, creating logs etc.)

### Usage

Include js combined file.
``` html
  <script src="dist/debugger.js"></script>
```

Add code to top of main js file to avoid error when you dont include debbuger files in production version.

``` js
    if(typeof DEBUGGER == "undefined") DEBUGGER = {call: function(){},addMethod: function(){}};
```

## Run debbuger method
```js
  DEBUGGER.call(methodName,vars[,moduleName]);
```
Arguments:

| Argument | Type | Description
|--------|---------|------------
| `methodName` | `string` | Method name
| `vars` | `mixed` | Vars which are passed to method
| `moduleName` | `string` | Module name from you call debugger method- is used to simply know where you call method- ex. method log show in console this property  

Example
```js
  DEBUGGER.call("info","Some message");
```

## Add methods

To add your own methods call addMethod on object.

```js
  DEBUGGER.addMethod(methodName,content [, requiredvars]);
```
Arguments:

| Argument | Type | Description
|--------|---------|------------
| `methodName` | `string` | Method name
| `content` | `function` | Method, argument is 'vars' which are passed in call method
| `requiredvars` | `array` | All required vars which must contain 'vars' object, not required when you pass only one var

If you dont pass object in call function, debugger create object with 'default' property. Futhermore add 'moduleNameCall' property- moduleName in call method.

Example: 

```js
  DEBUGGER.addMethod("log", function(Vars){
  
		this.print(Vars.moduleNameCall, Vars.default, "log");
		return true; // all method must return bool var
		
});

 ...
 
 DEBUGGER.call("log","Some message"); // string "Some message" is added to Vars.default property

```

## Available default methods
List of methods:

| Method | Arguments | Description
|--------|---------|------------
| `log` | `string` | Show log in console
| `error` | `string` | Show error in console
| `warm` | `string` | Show warn in console
| `info` | `string` | Show info in console

## To do
- Add debugger method where you can show messages, error. Now you must open console
- Add timers methods (make time measurement of exacuting scripts )
- Add method setConfig which you can set if message shoud show in console or in bar
- Add some aliases to different libraries (like fps graph etc)
- Add method to log and write in file all messages
