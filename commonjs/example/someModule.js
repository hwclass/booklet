/**
* @author hwclass
* @filename someModule.js
*/

// Register a module into the view instance
page.register('someModule', {
	init : function () {
		this.doSomething();
	},
	doSomething : function () {
		//do something
	}
});

module.exports = page;