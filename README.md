# booklet
A simple module initializer by creating view models.
The main attitude of this module binding system is inspired by Nicholas Zakas's presentation here : http://www.slideshare.net/nzakas/scalable-javascript-application-architecture

<a href="https://www.npmjs.com/package/booklet.js"><img src="https://badge.fury.io/js/booklet.js.svg"/></a>

[![NPM](https://nodei.co/npm/booklet.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/booklet.js?downloads=true&downloadRank=true&stars=true)

###Usage

####Create a Booklet instance

```javascript
var app = new Booklet('app', {someOption : 'some options'});
```

####Generate a Page instance by invoking createView method with a page name

```javascript
var page = app.createView('page', {somePageOption : 'some page options'});
```

####Bind a module into the instance with an init method calling the inner functions

```javascript
page.register('testModule', function () {
    return {
      init : function () {
        console.log('init invoked');
        this.testFunc();
      },
      testFunc : function () {
        console.log('testFunc invoked.');
      }
    }
  }
});
```

####Bind a module into the instance with a Page instance in the callback

```javascript
page.register('testModule', function (page) {
    return {
      init : function () {
        console.log('init invoked');
        var config = page.getConfig();
        console.dir(config.somePageOption); // logs 'some page options'
      },
      testFunc : function () {
        console.log('testFunc invoked.');
      }
    }
  }
});
```

####Make the new module begin to work specifically mentioning its name

```javascript
page.start('testModule');
```

####Or make the all modules begin to work

```
page.startAll();
```

###Binding Events for Elements

```javascript
page.register('testModule', {
  init : function () {
    this.bindEvents();
  },
  bindEvents : function () {
    page.bindEvent(document.getElementsByTagName('body'), 'click', function () {
      console.log('clicked on body');
    });
    page.bindEvent(document.getElementsByTagName('footer'), 'mouseout', function () {
      console.log('mouse out on footer');
    });
  }
});
```

###Creating Services for Booklet Instance

####Create a Booklet Service

```javascript
app.createService('testService', function () {
  return 'testService invoked'
});
```

####Invoke the Current Booklet Service

```javascript
page.register('menu', {
  init : function () {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked : function () {
    var testService = app.getService('testService');
    return testService();
  }
});
```

###Creating Services for Page Instance

####Create a Page Service

```javascript
page.createService('testService', function () {
  return 'testService invoked'
});
```

####Invoke the Current Page Service

```javascript
page.register('menu', {
  init : function () {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked : function () {
    var testService = page.getService('testService');
    return testService();
  }
});
```

###Creating Services for Booklet Instance with an Inner Service Provider

####Create a Booklet Service

```javascript
app.createService('testService', function () {
  return 'testService invoked'
});
```

####Invoke the Current Booklet Service by a Service Provider Method

```javascript
page.register('menu', {
  init : function () {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked : function () {
    var testService = this.getService('testService');
    return testService();
  },
  getService : function (serviceName) {
    return app.getService(serviceName);
  }
});
```

###Creating Services for Page Instance with an Inner Service Provider

####Create a Page Service

```javascript
page.createService('testService', function () {
  return 'testService invoked'
});
```

####Invoke the Current Page Service by a Service Provider Method

```javascript
page.register('menu', {
  init : function () {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked : function () {
    var testService = this.getService('testService');
    return testService();
  },
  getService : function (serviceName) {
    return page.getService(serviceName);
  }
});
```

###Creating Configuration Options for Booklet instance

####Create a Booklet instance configuration option

```javascript
var app = new Booklet('app', {
	appOption : 1
});
```

####Create a Page instance configuration option

```javascript
var page = app.createView('page', {
  pageOption : 2
})
```

####Create a Module Using Configuration Options

```javascript
page.register('testModule', {
  init : function () {
    this.logOptions();
  },
  logOptions : function () {
    console.dir(app.defaults);
    console.dir(page.defaults);
  }
});
```

###Creating Custom Events

####Subscribe for an Event with Page Instance

```javascript
page.subscribe('testEvent', function (data) {
  console.log(data);
});
```

####Publish an Event with Booklet Instance

```javascript
app.publish('testEvent', {
  testData : 'test data...'
}); // logs Object {testData: "test data..."}
```

#####TODO

* The subscribe/publish structure to be implemented into modules like page instances
