/*
 * The exmaple for object composition inheritance with ES6
 */

//factory function to generate factories

let factory = function factory (context, options) {
	return Object.assign(Object.create(context), options);
}

let moduleFactory = function moduleFactory (page, name, context) {
	page.modules.push({name : name, context : context});
    return Object.assign(Object.create(context));
}

//models
let app = {
    desc : 'some description',
	modules : [],
    create : factory
};

let page = {
	name : 'test view',
	modules : [],
    create : factory
};

let module = {
	name : 'dummy',
    context : null,
    create : moduleFactory
}

//initialize

//create a custom application
let appName = app.create(app, {desc : 'appName web application description'}),
    appView = document.getElementById('app');

appView.innerHTML = appName.desc;

//create a custom page
let productDetailPage = page.create(page, {name : 'productDetail view on appName'}),
    productDetailView = document.getElementById('view');

productDetailView.innerHTML = productDetailPage.name;

//register a module into a page
let someModule = module.create(productDetailPage, module, {name : 'someModule', context : {
	init : function () {
    	this.log();
    },
    log : function () {
        var someModuleView = document.getElementById('someModuleView');
    	someModuleView.innerHTML = 'logged from the new module registered.';
        console.dir(this);
    }
}});

//logs someModule's content with init and log methods
console.dir(someModule);

//logs the modules registered for the page
console.dir(page.modules);

//initializes the registered module
page.modules[0]['context']['context']['init']();
