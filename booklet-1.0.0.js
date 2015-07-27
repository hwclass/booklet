/*!
 * booklet.js. A tiny modular application mediator project
 *
 * Copyright (c) 2015 Barış Güler
 * http://hwclass.in
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Launch  : April 2015
 * Version : 1.1.0
 * Released: April 1st, 2015
 *
 *
 * manages the view states and other functionalities in applications
 */

/**
* Booklet : The main application wrapper object
* @param <String> name
* @param <Object> options
*/
var Booklet = function (name, options) {
	
	this.name = name;

	this.defaults = (typeof options !== 'undefined' ? options : {});

	var booklet = this;

	/**
	* Page : The View-Model object to bind values and events
	* @noparam
	*/
	var Page = function () {
		
		var self = this;

		this.booklet = booklet;

		var MODULES = [],
				TOPPICS = [];

		/**
		* register() is a registering method to add modules into the view model
		*
		* @param {String} moduleName
		* @param {Function} context
		*/
		this.register = function (moduleName, context) {
			MODULES.push({name : moduleName, fn : context, started : false});
		};

		/**
		* detach() is a subscribing method to listen publishing events
		*
		* @param {String} moduleName
		*/
		this.detach = function (moduleName) {
			var selectedModuleToDetach = self.getModule(moduleName, true);
			try {
				MODULES.splice(selectedModuleToDetach.index, 1);
			} catch (err) {
				console.log(err);
			};
		};

		/**
		* start() is a subscribing method to listen publishing events
		*
		* @param {String} moduleName
		*/
		this.start = function (moduleName) {
			var selectedModuleToStart = self.getModule(moduleName);
			if (!!selectedModuleToStart.fn) {
				selectedModuleToStart.fn.init();
				selectedModuleToStart.started = true;
			}
		};

		/**
		* startAll() is a sending data method to subscriptions listening publishing events
		*
		* @param {String} topic
		* @param {Object} info
		*/
		this.startAll = function () {
			for (var modulesCounter = 0, len = MODULES.length; modulesCounter < len; modulesCounter++) {
				if (!MODULES[modulesCounter].started) {
					self.start(MODULES[modulesCounter].name);
				} else {
				}
			}
		};

		this.stop = function (moduleName) {
			var selectedModuleToStop = self.getModule(moduleName);
			selectedModuleToStop = null;
		};

		/**
		* subscribe() is a subscribing method to listen publishing events
		*
		* @param {String} topic
		* @param {Function} listener
		*/
		this.subscribe = function (topic, listener) {
		  if(!TOPICS[topic]) TOPICS[topic] = { queue: [] };
		  var index = TOPICS[topic].queue.push(listener);
		  return (function(index) {
		    return {
		      remove: function() {
		        delete TOPICS[index];
		      }
		    }
		  })(index);
		};

		/**
		* publish() is a sending data method to subscriptions listening publishing events
		*
		* @param {String} topic
		* @param {Object} info
		*/
		this.publish = function (topic, info) {
		  if(!TOPICS[topic] || !TOPICS[topic].queue.length) return;
		  var items = TOPICS[topic].queue;
		  for(var x = 0; x < items.length; x++) {
		    items[x](info || {});
		  }
		};

		/**
		* getModule() is a sending data method to subscriptions listening publishing events
		*
		* @param {String} topic
		* @param {Object} info
		*/
		this.getModule = function (moduleName, withIndex) {
			var selectedModule,
					indexOfTheModule,
					builtModuleObj;
			for (var modulesCounter = 0, len = MODULES.length; modulesCounter < len; modulesCounter++) {
				if (MODULES[modulesCounter]['name'] === moduleName) {
					selectedModule = MODULES[modulesCounter];
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
		* get() is a sending data method to subscriptions listening publishing events
		*
		* @param {String} topic
		* @param {Object} info
		*/
		this.get = function (moduleName) {
			var selectedModule;
			for (var modulesCounter = 0, len = modules.length; modulesCounter < len; modulesCounter++) {
				if (MODULES[modulesCounter]['name'] === moduleName) {
					selectedModule = MODULES[modulesCounter];
				}
			};
			return selectedModule;
		};

		/**
		* getConfig() is a sending data method to subscriptions listening publishing events
		*
		* @param {String} topic
		* @param {Object} info
		*/
		this.getConfig = function () {
			return booklet.config;
		};

		/**
		* getUtility() is a sending data method to subscriptions listening publishing events
		*
		* @param {String} topic
		* @param {Object} info
		*/
		this.getUtility = function () {
			return booklet.utility;
		};

	};

	/**
	* createView() is a sending data method to subscriptions listening publishing events
	*
	* @param {String} topic
	* @param {Object} info
	*/
	this.createView = function (options) {
		self.defaults = (typeof options !== 'undefined' ? options : {});
		return new View();
	}

};
