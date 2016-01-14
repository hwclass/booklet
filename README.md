# booklet
A simple module initializer by creating view models.
The main attitude of this module binding system is inspired by Nicholas Zakas's presentation here : http://www.slideshare.net/nzakas/scalable-javascript-application-architecture

<img src="https://badge.fury.io/js/booklet.js.svg"/>

[![NPM](https://nodei.co/npm/booklet.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/booklet.png?downloads=true&downloadRank=true&stars=true)

###Usage

####Create a Booklet instance

<pre lang="javascript">
<code>
var app = new Booklet('app', {someOption : 'some options'});
</code>
</pre>

####Generate a Page instance by invoking createView method with a page name

<pre lang="javascript">
<code>
var page = app.createView('page', {somePageOption : 'some page options'});
</code>
</pre>

####Bind a module into the instance with an init method calling the inner functions

<pre lang="javascript">
<code>page.register('testModule', function () {
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
</code>
</pre>

####Bind a module into the instance with a Page instance in the callback

<pre lang="javascript">
<code>page.register('testModule', function (page) {
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
</code>
</pre>

####Make the new module begin to work specifically mentioning its name

<pre lang="javascript">
<code>
page.start('testModule');
</code>
</pre>

####Or make the all modules begin to work

<pre lang="javascript">
<code>
page.startAll();
</code>
</pre>

###Creating Services for Booklet Instance

####Create a Booklet Service

<pre lang="javascript">
<code>app.createService('testService', function () {
  return 'testService invoked'
});
</code>
</pre>

####Invoke the Current Booklet Service

<pre lang="javascript">
<code>page.register('menu', {
  init : function () {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked : function () {
    var testService = app.getService('testService');
    return testService();
  }
});
</code>
</pre>

###Creating Services for Page Instance

####Create a Page Service

<pre lang="javascript">
<code>page.createService('testService', function () {
  return 'testService invoked'
});
</code>
</pre>

####Invoke the Current Page Service

<pre lang="javascript">
<code>page.register('menu', {
  init : function () {
    console.log(this.getServiceWorked()); //logs "testService invoked"
  },
  getServiceWorked : function () {
    var testService = page.getService('testService');
    return testService();
  }
});
</code>
</pre>

###Creating Services for Booklet Instance with an Inner Service Provider

####Create a Booklet Service

<pre lang="javascript">
<code>app.createService('testService', function () {
  return 'testService invoked'
});
</code>
</pre>

####Invoke the Current Booklet Service by a Service Provider Method

<pre lang="javascript">
<code>page.register('menu', {
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
</code>
</pre>

###Creating Services for Page Instance with an Inner Service Provider

####Create a Page Service

<pre lang="javascript">
<code>page.createService('testService', function () {
  return 'testService invoked'
});
</code>
</pre>

####Invoke the Current Page Service by a Service Provider Method

<pre lang="javascript">
<code>page.register('menu', {
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
</code>
</pre>

###Creating Configuration Options for Booklet instance

####Create a Booklet instance configuration option

<pre lang="javascript">
<code>var app = new Booklet('app', {
	appOption : 1
});
</code>
</pre>

####Create a Page instance configuration option

<pre lang="javascript">
<code>var page = app.createView('page', {
  pageOption : 2
})
</code>
</pre>

####Create a Module Using Configuration Options

<pre lang="javascript">
<code>page.register('testModule', {
  init : function () {
    this.logOptions();
  },
  logOptions : function () {
    console.dir(app.defaults);
    console.dir(page.defaults);
  }
});
</code>
</pre>

###Creating Custom Events

####Subscribe for an Event with Page Instance

<pre lang="javascript">
<code>page.subscribe('testEvent', function (data) {
  console.log(data);
});
</code>
</pre>

####Publish an Event with Booklet Instance

<pre lang="javascript">
<code>app.publish('testEvent', {
  testData : 'test data...'
}); // logs Object {testData: "test data..."}
</code>
</pre>

###Binding Events for Elements

<pre lang="javascript">
<code>page.register('testModule', {
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
</code>
</pre>
