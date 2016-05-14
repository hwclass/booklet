/*!
 * booklet.js. A simple module initializer by creating view models.
 *
 * Copyright (c) 2015 Barış Güler
 * http://hwclass.in
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Launch  : July 2015
 * Version : 1.0.0
 * Released: July 27th, 2015
 *
 *
 * Manages the view states and other functionalities in page instances.
 * Every page instance is generated from a Booklet instance.
 * Page instances are related with a view and binds model data and functionalities.
 * When the init method of a Page instance is invoked, it means that you are about to init related module.
 */

;var Booklet = (function () {

    /**
    * Booklet : The main application wrapper object
    * @param {string} name
    * @param {object} options
    */
    var Booklet = function () {

      /*
       *Setting the context to another variable to seperate the Page instance context and Booklet context
       *@type {Booklet}
       */
      var booklet = this;

      /*
       *name variable of Booklet instance
       *@type {string}
       */
      this.name = name;

      /*
       *defaults object for identified options in Booklet instance
       *@type {object}
       */
      this.defaults = (typeof options !== 'undefined' ? options : {});

      /*
       *services array to keep services that are defined into Booklet instance
       *@type {array}
       */
      this.services = [],

      /*
       *topics array to keep subscribed topics that are defined into Booklet instance
       *@type {array}
       */
      this.topics = [];

      /**
       * createView() is a creator method for new views
       *
       * @param {string} name
       * @param {object} options
      */
      this.createView = function (name, options) {
        var defaults = (typeof options !== 'undefined' ? options : {});
        return new Page(defaults);
      };

      /**
       * createService() is a creator method for new services
       *
       * @param {string} serviceName
       * @param {object} context
      */
      this.createService = function (serviceName, context) {
       booklet.services.push({name : serviceName, context : context});
      };

      /**
       * getService() is a getter method to fetch the specified service within Booklet instance with a service name
       *
       * @param {string} serviceName
      */
      this.getService = function (serviceName) {
        var selectedService;
        for (var servicesCounter = 0, len = booklet.services.length; servicesCounter < len; servicesCounter++) {
          if (booklet.services[servicesCounter]['name'] === serviceName) {
            selectedService = booklet.services[servicesCounter]['context'];
          }
        };
        return selectedService;
      };

      /**
       * publish() is a sending data method to subscriptions listening publishing events
       *
       * @param {string} topic
       * @param {object} info
      */
      this.publish = function (topic, info) {
        if(!booklet.topics[topic] || !booklet.topics[topic].queue.length) return;
        var items = booklet.topics[topic].queue;
        for(var x = 0; x < items.length; x++) {
          items[x](info || {});
        }
      };

    }

    /**
    * Page : The View-Model object to bind values and events
    * @param {object} options
    */
    var Page = function (options) {

      /**
       *Setting the context to another variable to seperate the Booklet instance context and Page context
       *@type {Page}
       */
      var page = this;

      /**
       *defaults object for identified options in Page instance
       *@type {object}
       */
      this.defaults = options;

      /**
       *modules array to keep modules that are defined into Page instance
       *@type {array}
       */
      this.modules = [],

      /**
       *topics array to keep subscribed topics that are defined into Page instance
       *@type {array}
       */
      this.topics = [],

      /**
       *services array to keep services that are defined into Page instance
       *@type {array}
       */
      this.services = [];

      /**
       * register() is a registering method to add modules into the view model
       *
       * @param {string} moduleName
       * @param {function} context
       */
      this.register = function (moduleName, context) {
        page.modules.push({name : moduleName, fn : context(page), started : false});
      };

      /**
       * detach() is a destroying the connection any module with the main booklet object
       *
       * @param {string} moduleName
      */
      this.detach = function (moduleName) {
        var selectedModuleToDetach = page.getModule(moduleName, true);
        try {
          page.modules.splice(selectedModuleToDetach.index, 1);
        } catch (err) {
          console.log(err);
        };
      };

      /**
       * start() is starting point to make any module begin to work
       *
       * @param {string} moduleName
      */
      this.start = function (moduleName) {
        var selectedModuleToStart = page.getModule(moduleName);
        if (!!selectedModuleToStart.fn) {
          selectedModuleToStart.fn.init();
          selectedModuleToStart.started = true;
        }
      };

      /**
       * startAll() is a starting point for all modules to make them all began to work
       *
       * @noparam
      */
      this.startAll = function () {
        for (var modulesCounter = 0, len = page.modules.length; modulesCounter < len; modulesCounter++) {
          if (!page.modules[modulesCounter].started) {
            page.start(page.modules[modulesCounter].name);
          }
        }
      };

      /**
       * stop() is a method to stop a module working
       *
       * @param {string} moduleName
      */
      this.stop = function (moduleName) {
        var selectedModuleToStop = page.getModule(moduleName);
        selectedModuleToStop = null;
      };

      /**
       * stopAll() is a method to stop working all modules
       *
       * @noparam
      */
      this.stopAll = function () {
        for (var modulesCounter = 0, len = page.modules.length; modulesCounter < len; modulesCounter++) {
          if (!page.modules[modulesCounter].started) {
            page.stop(page.modules[modulesCounter].name);
          }
        }
      };

      /**
       * subscribe() is a subscribing method to listen publishing events
       *
       * @param {string} topic
       * @param {function} listener
      */
      this.subscribe = function (topic, listener) {
        if(!page.TOPICS[topic]) page.TOPICS[topic] = { queue: [] };
        var index = page.TOPICS[topic].queue.push(listener);
        return (function(index) {
          return {
            remove: function() {
              delete page.TOPICS[index];
            }
          }
        })(index);
      };

      /**
       * getModule() is a getter method to get modules with a module name and its index
       *
       * @param {string} moduleName
       * @param {boolean} withIndex
      */
      this.getModule = function (moduleName, withIndex) {
        var selectedModule,
        indexOfTheModule,
        builtModuleObj;
        for (var modulesCounter = 0, len = page.modules.length; modulesCounter < len; modulesCounter++) {
          if (page.modules[modulesCounter]['name'] === moduleName) {
            selectedModule = page.modules[modulesCounter];
            indexOfTheModule = modulesCounter;
          }
        };
        if (withIndex) {
          selectedModule = builtModuleObj = {
            selectedModule : selectedModule,
            index : indexOfTheModule
          }
        }
        return selectedModule;
      };

      /**
       * createService() is a creator method for new services
       *
       * @param {string} serviceName
       * @param {object} context
      */
      this.createService = function (serviceName, context) {
        page.services.push({name : serviceName, context : context});
      };

      /**
       * getService() is a getter method to fetch the specified service within Page instance with a service name
       *
       * @param {string} serviceName
      */
      this.getService = function (serviceName) {
        var selectedService;
        for (var servicesCounter = 0, len = page.services.length; servicesCounter < len; servicesCounter++) {
          if (page.services[servicesCounter]['name'] === serviceName) {
            selectedService = page.services[servicesCounter]['context'];
          }
        };
        return selectedService;
      };

      /**
       * bindEvent() is a method to bind events for the specified element.
       *
       * @param {object} element
       * @param {string} eventType
       * @param {function} callback
      */
      this.bindEvent = function(element, eventType, callback) {
        var el = element[0];
        function listenHandler(e) {
          var ret = callback.apply(this, arguments);
          if (ret === false) {
            e.stopPropagation();
            e.preventDefault();
          }
          return(ret);
        }
        if (el.addEventListener) {
          el.addEventListener(eventType, listenHandler, false);
        } else if (el.attachEvent) {
          el.attachEvent ("on" + eventType, callback);
        } else {
          el.attachEvent("on" + eventType, callback);
        }
      };

      /**
       * getConfig() is a method to get the current configuration properties and etc.
       *
       * @noparam
      */
      this.getConfig = function () {
        return booklet.config;
      };

      /**
       * getUtility() is a method to get the utility methods set into current context
       *
       * @noparam
      */
      this.getUtility = function () {
        return booklet.utility;
      };

    };

    return Booklet;

})();
