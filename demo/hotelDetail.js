'use strict';

//Create a page instance from the Booklet
module.exports = booking.createView({
	someOption : 'some option',
	getSomeString : function () {
		return 'name string';
	}
});