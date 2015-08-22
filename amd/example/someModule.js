/**
* @author hwclass
* @filename someModule.js
*/

// Create a module called someModule
define(['page'], function(page) {
  page.register('someModule', {
    init : function () {
      this.bindEvents();
    },
    bindEvents : function () {
      page.bindEvent(document.getElementById('addSomething'), 'click', function () {
        //add something
      });
      page.bindEvent(document.getElementById('removeSomething'), 'click', function () {
        //remove something
      });
    }
  });
  return page.getModule('someModule');
});