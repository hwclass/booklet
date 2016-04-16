'use strict';

//Create a page instance from the Booklet
var hotelDetail = booking.createView({
	someOption : 'some option',
	getSomeString : function () {
		return 'name string';
	}
});