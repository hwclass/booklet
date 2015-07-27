# booklet
A simple module initializer by creating view models.

###Usage

####Create a Booklet instance

<pre lang="javascript">
<code>
var booklet = new Booklet('booking', {someOption : 'some options'});
</code>
</pre>

####Generate a Page instance by invoking createView method with a page name

<pre lang="javascript">
<code>
var page = booklet.createView('home');
</code>
</pre>

####Bind a module into the instance with an init method calling the inner functions

<pre lang="javascript">
<code>
page.register('testModule', function () {
	init : function () {
		someMethod();
	},
	someMethod : function () {
		console.log('someMethod initialized');
	}
});
</code>
</pre>

####Make the new module begin to work specifically mentioning its name

<pre lang="javascript">
<code>
page.start('home');
</code>
</pre>

####Or make the all modules begin to work

<pre lang="javascript">
<code>
page.startAll();
</code>
</pre>
