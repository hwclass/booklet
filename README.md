# booklet
A simple module initializer by creating view models.
The main attitude of this module binding system is inspired by Nicholas Zakas's presentation here : http://www.slideshare.net/nzakas/scalable-javascript-application-architecture

<a href="https://www.npmjs.com/package/booklet.js"><img src="https://badge.fury.io/js/booklet.js.svg"/></a>

[![NPM](https://nodei.co/npm/booklet.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/booklet.js?downloads=true&downloadRank=true&stars=true)

### Usage

#### Create a Booklet instance

```js
var app = new Booklet('app', {someOption : 'some options'});
```

#### Generate a Page instance by invoking createView method with a page name

```js
var page = app.createView('page', {somePageOption : 'some page options'});
```

#### Bind a module into the instance with an init method calling the inner functions

```js
page.register('testModule', () => {
    return {
      init: () => {
        console.log('init invoked');
        this.testFunc();
      },
      testFunc: () => {
        console.log('testFunc invoked.');
      }
    }
  }
});
```

#### Bind a module into the instance with a Page instance in the callback

```js
page.register('testModule', (page) => {
    return {
      init: () => {
        console.log('init invoked');
        var config = page.getConfig();
        console.dir(config.somePageOption); // logs 'some page options'
      },
      testFunc: () => {
        console.log('testFunc invoked.');
      }
    }
  }
});
```

#### Make the new module begin to work specifically mentioning its name

```js
page.start('testModule');
```

#### Or make the all modules begin to work

```
page.startAll();
```

### Binding Events for Elements

```js
const elementCache = {
  body: document.getElementsByTagName('body'),
  footer: document.getElementsByTagName('footer')
}

page.register('testModule', {
  init: () => {
    this.bindEvents();
  },
  bindEvents: () => {
    page.bindEvent(elementCache.body, 'click', () => {
      console.log('clicked on body');
    });

    page.bindEvent(elementCache.footer, 'mouseout', () => {
      console.log('mouse out on footer');
    });
  }
});
```

### Creating Services for Booklet Instance

#### Create a Booklet Service

```js
app.createService('testService', () => 'testService invoked');
```

#### Invoke the Current Booklet Service

```js
page.register('menu', {
  init: () => {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked: () => {
    var testService = app.getService('testService');
    return testService();
  }
});
```

### Creating Services for Page Instance

#### Create a Page Service

```js
page.createService('testService', () => 'testService invoked');
```

#### Invoke the Current Page Service

```js
page.register('menu', {
  init: () => {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked: () => {
    var testService = page.getService('testService');
    return testService();
  }
});
```

### Creating Services for Booklet Instance with an Inner Service Provider

#### Create a Booklet Service

```js
app.createService('testService', () => 'testService invoked');
```

#### Invoke the Current Booklet Service by a Service Provider Method

```js
page.register('menu', {
  init: () => {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked: () => {
    var testService = this.getService('testService');
    return testService();
  },
  getService: (serviceName) => {
    return app.getService(serviceName);
  }
});
```

### Creating Services for Page Instance with an Inner Service Provider

#### Create a Page Service

```js
page.createService('testService', () => 'testService invoked');
```

#### Invoke the Current Page Service by a Service Provider Method

```js
page.register('menu', {
  init: () => {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked: () => {
    var testService = this.getService('testService');
    return testService();
  },
  getService: serviceName => page.getService(serviceName)
});
```

### Creating Configuration Options for Booklet instance

#### Create a Booklet instance configuration option

```js
var app = new Booklet('app', {
	appOption : 1
});
```

#### Create a Page instance configuration option

```js
var page = app.createView('page', {
  pageOption : 2
})
```

#### Create a Module Using Configuration Options

```js
page.register('testModule', {
  init: () => {
    this.logOptions();
  },
  logOptions: () => {
    console.dir(app.defaults);
    console.dir(page.defaults);
  }
});
```

### Creating Custom Events

#### Subscribe for an Event with Page Instance

```js
page.subscribe('testEvent', (data) => {
  console.log(data);
});
```

#### Publish an Event with Booklet Instance

```js
app.publish('testEvent', {
  testData : 'test data...'
}); // logs Object {testData: "test data..."}
```

##### TODO

* The subscribe/publish structure to be implemented into modules like page instances
