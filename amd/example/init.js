/**
* @author hwclass
* @filename init.js
*/

// Initialize all modules registered into the Page instance
define(['someModule'], function(someModule) {
  
  //init all modules
  //page.startAll();

  //init a specific module
  page.start(someModule.name);

});