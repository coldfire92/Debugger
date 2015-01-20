#Debugger
Simple modular object to debbug code (ex. showing in console, creating logs etc.)

### Usage

Include js combined file.
``` html
<script src="dist/debugger.js"></script>
```

Add code before your js files to avoid error when you don`t include debbuger files in production version.

``` js
if(typeof DEBUGGER == "undefined") DEBUGGER = {run: function(){},addMethod: function(){}};
```

## Run debbuger method
```js
DEBUGGER.run(methodName,vars[,moduleName]);
```
Arguments:

| Argument | Type | Description
|--------|---------|------------
| `methodName` | `string` | Method name
| `vars` | `mixed` | Vars which are passed to method
| `moduleName` | `string` | Module name from you call debugger method- is used to simply know where you call method- e.g. method log show in console this property  

Example
```js
DEBUGGER.run("info","Some message");
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
 
DEBUGGER.run("log","Some message"); // string "Some message" is added to Vars.default property

```
## Methods utils
In 'this' object you can use utils methods like:
### this.print()
Print messages in console, special debug bar or log file.
```js
this.print(module, message[, type='log', plain=false]);
```

| Argument | Type | Default | Description
|--------|---------|-------|---------
| `module` | `string` | - |Module name
| `message` | `string` | - |Show error in console
| `type` | `string` | `log` |Message type {log,warn,info,error}
| `plain` | `bool` |  false |Don`t print module name

### this.setObject()
Save an object for later.
```js
this.setObject(key, object[, methodName='debuger:setObject']);
```
| Argument | Type | Default | Description
|--------|---------|-------|---------
| `key` | `string` | - | Key
| `object` | `mixed` | - | Object to save
| `methodName` | `string` | `debuger:setObject` | Message type {log,warn,info,error}

### this.getObject()
Get previously saved objects.
```js
this.getObject(key, [, methodName='debuger:setObject']);
```
| Argument | Type | Default | Description
|--------|---------|-------|---------
| `key` | `string` | - | Key
| `methodName` | `string` | `debuger:setObject` | Method name 

### this.deleteObject()
Delete an saved object.
```js
this.deleteObject(key [, methodName='debuger:setObject']);
```
| Argument | Type | Default | Description
|--------|---------|-------|---------
| `key` | `string` | - | Key
| `methodName` | `string` | `debuger:deleteObject` | Method name 

## Available default methods
List of methods:

| Method | Arguments | Description
|--------|-------------|-------------
| `log` | `string` | Show log in console | 
| `error` | `string` | Show error in console
| `warn` | `string` | Show warn in console
| `info` | `string` | Show info in console
| `startTimer` | `string` | Start timer with passed id
| `stopTimer` | `string` | Stop timer with passed id and return time in ms
## To do
- Add debugger method where you can show messages, errors etc... Now you must open console.
- Add method setConfig which you can set if message shoud show in console or in bar.
- Add some aliases to different libraries (like fps graph etc).
- Add method to log and write in file all messages.