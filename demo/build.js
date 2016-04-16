(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//Create an instance
module.exports = new Booklet('booking', {
  someOption : 348939,
  ajax : function (options, callback) {
    $.ajax({
      method: options.method,
      dataType : options.dataType,
      url: options.url,
      success : callback
    })
  }
});
},{}],2:[function(require,module,exports){
'use strict';

//Create a page instance from the Booklet
module.exports = booking.createView({
	someOption : 'some option',
	getSomeString : function () {
		return 'name string';
	}
});
},{}],3:[function(require,module,exports){
'use strict';

var Mock = require('./sampleData'),
    booking = require('./booking');

//import hotel detail view    
var hotelDetail = require('./hotelDetail');

//similar hotel module initialization
hotelDetail.register('similarHotels', {
	elements : {
		similarHotelsList : $('#similarHotelsList')
	},
	getSimilarHotels : function () {
		var mock = new Mock();
		var currentHotel = mock.getData('currentHotel');
		return currentHotel.similarHotels;
	},
	injectHotelsIntoDom : function (similarHotels) {
		var similarHotelsListElement = this.elements.similarHotelsList;
		for (var counterForSimilarHotels = 0, len = similarHotels.length; counterForSimilarHotels < len; counterForSimilarHotels++) {
			$(similarHotelsListElement).append('<li style="display: inline-block; width: 225px;   box-sizing: border-box;   border: 1px solid #ccc;   padding: 10px;   margin: 5px; border-radius: 3px;"><a href="'+ similarHotels[counterForSimilarHotels].link +'" target="_blank"><div style="position: relative;"><img src="img/1_thumb.jpg" alt="test alt text" style="margin: 3px; width: 197px;float: left;"><p style="float: left; margin: 10px 0 0 4px; padding: 0; color: #0896ff;">' + similarHotels[counterForSimilarHotels].name + '</p><span class="stars" style="float: left; margin: 10px 2px 0 14px;">★★★★★</span><p style="float: right; margin: 5px 3px 0 18px; padding: 0;background-color: #003580;color: #FFFFFF;padding: 5px;border-radius: 5px;">' + similarHotels[counterForSimilarHotels].reviews[0].point + '</p></div></a></li>');
		}
	},
	init : function () {
		this.injectHotelsIntoDom(this.getSimilarHotels());
	}
});

//reviews of hotels registration
hotelDetail.register('reviews', {
	config : {
		theFirstSightOfPage : true,
		reviews : null,
		reviewsPerPage : 5,
		remainingReviewsExist : false,
		remainingReviews : 0,
		mock : null
	},
	elements : {
		reviewsList : $('.reviews_list'),
		paginationWrapper : $('#paginationWrapper'),
		paginationLink : null,
		lastSelectedPaginationDot : null,
		reviewItem : null,
		orderUp : $('.review-order-up'),
		orderDown : $('.review-order-down')
	},
	getReviews : function () {
		return this.config.mock.data.currentHotel.reviews;
	},
	getReviewsAsync : function (callback) {
		callback(this.getReviews());
	},
	getNumberOfReviews : function () {
		return this.config.mock.data.currentHotel.reviews.length;
	},
	injectReviewsIntoDom : function (reviews) {
		var self = this,
				reviewsList = this.elements.reviewsList;
		
		if ($(reviewsList).find('li').length > 0) {
			self.emptyReviewsList();
		}
		
		for (var counterForReviews = 0, len = self.config.reviewsPerPage; counterForReviews < len; counterForReviews++) {
			$(reviewsList).append('<li class="review_item" data-score="'+reviews[counterForReviews]['score']+'"><strong class="review_score">' + reviews[counterForReviews]['score'] + '</strong><blockquote class="review_content">' + reviews[counterForReviews]['text'] + '<cite> ' + reviews[counterForReviews]['userName'] + ' </cite></blockquote></li>');
		};
		
		self.changePaginationDotsOrientation($('.paginationLink').get(0));
		
		this.elements.reviewItem = $('.review_item');
	},
	injectReviewsIntoDomInRange : function (start, reviews) {
		var self = this,
				reviewsList = this.elements.reviewsList,
				end = (self.remainingReviewsExist && (start + self.remainingReviews) == this.getNumberOfReviews() ? start + self.remainingReviews : (start + self.config.reviewsPerPage));
				self.emptyReviewsList();
		for (var counterForReviews = start; counterForReviews < end; counterForReviews++) {
			$(reviewsList).append('<li class="review_item" data-score="'+reviews[counterForReviews]['score']+'"><strong class="review_score">' + reviews[counterForReviews]['score'] + '</strong><blockquote class="review_content">' + reviews[counterForReviews]['text'] + '<cite> ' + reviews[counterForReviews]['userName'] + ' </cite></blockquote></li>');
		};
		this.elements.reviewItem = $('.review_item');
	},
	emptyReviewsList : function () {
		var self = this,
				reviewsList = this.elements.reviewsList;
		$(reviewsList).html('');
	},
	createPaginationDots : function () {
		var self = this,
				reviews = self.getReviews(),
				reviewsPerPage = self.config.reviewsPerPage,
				dividerForPagination = Math.floor(self.getNumberOfReviews() / reviewsPerPage),
				numberOfReviews = self.getNumberOfReviews(),
				remainingReviews = (self.getNumberOfReviews() % reviewsPerPage > 0 ? self.getNumberOfReviews() % reviewsPerPage : 0),
				counterForReviews = (typeof counterForReviews != 'undefined' ? counterForReviews : 1);
		self.generatePaginationDots(counterForReviews, dividerForPagination, remainingReviews, function () {
			self.setElements();
		});
	},
	setElements : function () {
		this.elements.paginationLink = $('.paginationLink');
		this.elements.paginationWrapper = $('#paginationWrapper');
	},
	generatePaginationDots : function (counterForReviews, dividerForPagination, remainingReviews, callback) {
		var self = this;
		for (; counterForReviews <= dividerForPagination; counterForReviews++) {
			$(self.elements.paginationWrapper).append('<a class="paginationLink" data-step="'+ counterForReviews +'"><span style="padding: 5px; margin: 5px; background-color: #003580; color: #FFFFFF;" class="cursor-pointer">' + counterForReviews + '</span></a>');
		};
		if (remainingReviews > 0) {
			this.remainingReviewsExist = true;
			this.remainingReviews = remainingReviews;
			this.generateRemainingPaginationDots(dividerForPagination + 1);
		}
		callback();
	},
	generateRemainingPaginationDots : function (lastPaginationNumber) {
		$('#paginationWrapper').append('<a class="paginationLink" data-step="'+ lastPaginationNumber +'"><span style="padding: 5px; margin: 5px; background-color: #003580; color: #FFFFFF;" class="cursor-pointer">' + lastPaginationNumber + '</span></a>');
	},
	bindEvents : function () {
		var self = this;
		$(this.elements.paginationLink).on('click', function (event) {
			self.eventOnClickForPaginationDot(self, event);
		});
		$(this.elements.orderUp).on('click', function () {
			var sortedReviewsListAsHtml = self.getSorted('.review_item', 'data-score', 'up');
			self.emptyReviewsList();
			$(self.elements.reviewsList).html(sortedReviewsListAsHtml);
		});
		$(this.elements.orderDown).on('click', function () {
			var sortedReviewsListAsHtml = self.getSorted('.review_item', 'data-score', 'down');
			self.emptyReviewsList();
			$(self.elements.reviewsList).html(sortedReviewsListAsHtml);
		});
	},
	eventOnClickForPaginationDot : function (self, event) {
		self.changePaginationDotsOrientation(event.target.parentElement);
	},
	changePaginationDotsOrientation : function (eventTarget) {
		var step = $(eventTarget).data('step'),
				reviews = this.getReviews(),
				reviewsPerPage = this.config.reviewsPerPage;
		$(eventTarget).off('click');
		$(eventTarget).find('span').addClass('bg-color-white fore-color-blue bold').removeClass('cursor-pointer');
		this.recoverLastSelectedPaginationDot($(this.lastSelectedPaginationDot));
		this.lastSelectedPaginationDot = $(eventTarget);
		this.injectReviewsIntoDomInRange((this.config.theFirstSightOfPage ? 0 : (reviewsPerPage * step) - reviewsPerPage), reviews);
	},
	recoverLastSelectedPaginationDot : function (paginationDot) {
		var self = this;
		$(paginationDot).on('click', function (event) {
			self.eventOnClickForPaginationDot(self, event);
		});
		$(paginationDot).find('span').removeClass('bg-color-white fore-color-blue bold cursor-pointer').addClass('cursor-pointer');
	},
	getSorted : function (selector, attrName, direction) {
		return $($(selector).toArray().sort(function(firstElement, secondElement){
			var firstElementScore = parseInt(firstElement.getAttribute(attrName)),
			secondElementScore = parseInt(secondElement.getAttribute(attrName));
			return (direction === 'down' ? firstElementScore - secondElementScore : secondElementScore - firstElementScore);
		}));
	},
	createMockInstance : function (callback) {
		this.config.mock = new Mock();
		callback();
	},
	fillReviews : function () {
		this.config.reviews = this.config.mock.data.currentHotel.reviews;
	},
	init : function () {
		var self = this;
		this.createMockInstance(function () {
			self.createPaginationDots();
			self.getReviewsAsync(function (data) {
					self.injectReviewsIntoDom(data);
				});
			self.bindEvents();
			self.config.theFirstSightOfPage = false;
			self.fillReviews();
		});
	}
});

//rooms selection registration
hotelDetail.register('roomSelection', {
	config : {
		mock : null
	},
	elements : {
		roomsTable : $('.rooms_table'),
		roomSelectionList : $('.room_selection_list'),
		roomSelections : $('.room_selection'),
		roomOccupancyTitle : $('.room_occupancy_title'),
		occupancyOrderUp : $('.occupancy-order-up'),
		occupancyOrderDown : $('.occupancy-order-down'),
		roomPriceOrderUp : $('.room-price-order-up'),
		roomPriceOrderDown : $('.room-price-order-down'),
		roomPriceTitle : $('.room_price_title'),
		roomItem : null,
		roomTotals : null,
		fullTotalPrice : $('.fullTotalPrice')
	},
	getRoomTypes : function () {
		return this.config.mock.data.currentHotel.roomTypes;
	},
	injectRoomTypesIntoDom : function () {
		var roomTypes = this.getRoomTypes(),
		roomsTable = this.elements.roomsTable;
		for (var counterForRoomTypes = 0, len = roomTypes.length; counterForRoomTypes < len; counterForRoomTypes++) {
			var dealLink = (roomTypes[counterForRoomTypes].dealLink ? roomTypes[counterForRoomTypes].dealLink : false),
			alertLink = (roomTypes[counterForRoomTypes].alertLink ? roomTypes[counterForRoomTypes].alertLink : false),
			statusHtml = '';
			if (dealLink) {
				statusHtml = '<a class="deal" target="_blank" href="'+ (roomTypes[counterForRoomTypes].dealLink ? roomTypes[counterForRoomTypes].dealLink : '#') + '"">' + roomTypes[counterForRoomTypes].status + '</a>';
			} else {
				if (alertLink) {
					statusHtml = '<a class="alert" target="_blank" href="'+ (roomTypes[counterForRoomTypes].alertLink ? roomTypes[counterForRoomTypes].alertLink : '#') + '"">' + roomTypes[counterForRoomTypes].status + '</a>';
				} else {
					statusHtml = roomTypes[counterForRoomTypes].status;
				}
			};
			$(roomsTable).append('<tr class="room_item" data-room-price="' + roomTypes[counterForRoomTypes].pricePerRoom + '" data-room-occupancy="' + roomTypes[counterForRoomTypes].occupancy + '"><td class="room_name">' + roomTypes[counterForRoomTypes].roomName + '</td><td class="room_status">' + statusHtml + '</td><td class="room_occupancy">' + roomTypes[counterForRoomTypes].occupancy + '</td><td class="room_price">€' + roomTypes[counterForRoomTypes].pricePerRoom + '</td><td class="room_quantity"><select name="room[basic2]" class="room_selection"><option value="0" selected="selected">0</option><option value="1">1</option><option value="2">2</option></select></td><td class="room_total">-</td></tr>');
		};
		this.setElements();
	},
	setElements : function () {
		this.elements.roomItem = $('.room_item');
		this.elements.roomSelections = $('.room_selection');
		this.elements.roomTotals = $('.room_total');
	},
	bindEvents : function () {
		var self = this,
			roomSelections = this.elements.roomSelections;
		roomSelections.on('change', function (event) {
			var unitPrice = self.getUnitPriceFromDom(event.target),
					totalRoomPrice = self.calculateRoomPrice({unitPrice : unitPrice, quantity : event.target.value});
			self.setTotalRoomPriceIntoDom(event.target, totalRoomPrice);
			self.setFullTotalRoomsPriceIntoDom(self.getFullTotalRoomsPrice());
		});
		$(self.elements.occupancyOrderUp).on('click', function () {
			var sortedRoomSelectionListAsHtml = self.getSorted('.room_item', 'data-room-occupancy', 'up');
			self.emptyRoomSelectionList();
			$(self.elements.roomSelectionList).html(sortedRoomSelectionListAsHtml);
			self.bindEvents();
		});
		$(self.elements.occupancyOrderDown).on('click', function () {
			var sortedRoomSelectionListAsHtml = self.getSorted('.room_item', 'data-room-occupancy', 'down');
			self.emptyRoomSelectionList();
			$(self.elements.roomSelectionList).html(sortedRoomSelectionListAsHtml);
			self.bindEvents();
		});
		$(self.elements.roomPriceOrderUp).on('click', function () {
			var sortedRoomSelectionListAsHtml = self.getSorted('.room_item', 'data-room-price', 'up');
			self.emptyRoomSelectionList();
			$(self.elements.roomSelectionList).html(sortedRoomSelectionListAsHtml);
			self.bindEvents();
		});
		$(self.elements.roomPriceOrderDown).on('click', function () {
			var sortedRoomSelectionListAsHtml = self.getSorted('.room_item', 'data-room-price', 'down');
			self.emptyRoomSelectionList();
			$(self.elements.roomSelectionList).html(sortedRoomSelectionListAsHtml);
			self.bindEvents();
		});
	},
	getUnitPriceFromDom : function (element) {
		return $(element).parent('td').prev('.room_price').html().split('€')[1];
	},
	calculateRoomPrice : function (roomObj) {
		return roomObj.unitPrice * roomObj.quantity;
	},
	setTotalRoomPriceIntoDom : function (element, totalRoomPrice) {
		if (totalRoomPrice !== 0) {
			$(element).parent('td').next('.room_total').html('€' + totalRoomPrice);
		} else {
			$(element).parent('td').next('.room_total').html('-');
		}
	},
	getFullTotalRoomsPrice : function () {
		var roomTotals = this.elements.roomTotals,
				fullTotalPrice = 0.0;
		for (var counterForRoomTotals = 0, len = roomTotals.length; counterForRoomTotals < len; counterForRoomTotals++) {
			var roomTotalsPriceElementVal = $($(roomTotals).get(counterForRoomTotals)).html().split('€')[1];
			if ( roomTotalsPriceElementVal !== '-' && (typeof roomTotalsPriceElementVal !== 'undefined')) {
				fullTotalPrice += Number.parseFloat(roomTotalsPriceElementVal);
			}
		}
		return fullTotalPrice.toFixed(2);
	},
	setFullTotalRoomsPriceIntoDom : function (fullTotalPrice) {
		$(this.elements.fullTotalPrice).html('€' + fullTotalPrice);
	},
	emptyRoomSelectionList : function () {
		var self = this,
		roomSelectionList = this.elements.roomSelectionList;
		$(roomSelectionList).html('');
	},
	getSorted : function (selector, attrName, direction) {
		return $($(selector).toArray().sort(function(firstElement, secondElement){
			var firstElementScore = parseInt(firstElement.getAttribute(attrName)),
					secondElementScore = parseInt(secondElement.getAttribute(attrName));
			return (direction === 'down' ? firstElementScore - secondElementScore : secondElementScore - firstElementScore);
		}));
	},
	createMockInstance : function (callback) {
		this.config.mock = new Mock();
		callback();
	},
	init : function () {
		var self = this;
		this.createMockInstance(function () {
			self.injectRoomTypesIntoDom();
			self.bindEvents();
		});
	}
});

//Start all modules of the hotel detail view
hotelDetail.startAll();

},{"./booking":1,"./hotelDetail":2,"./sampleData":4}],4:[function(require,module,exports){
'use strict';

/**
* Mock : The data mocking object
* @noparam
*/
module.exports = function () {

  /*
   *Setting for the context 'this' into another variable
   *@type {Mock}
   */
  var self = this;

  this.data = {
    currentHotel : {
      id : 68756432,
      name : 'Test Hotel',
      address : 'Beyoğlu İstanbul',
      starPoints : 4,
      images : [
        {src : 'https://www.booking.com/', altText : 'Test alt text 1'},
        {src : 'https://www.booking.com/', altText : 'Test alt text 2'}
      ],
      desc : 'Test description',
      facilities : {
        freeWiFi : true,
        swimmingPool : true,
        gym : true,
        concierge : true,
        restaurant : true,
        freeParking : true,
        satelliteTv : false,
        roomService : false
      },
      roomTypes : [
        {roomName : 'Basic 2 Bed', status : 'The last rooms is rented before 2 minutes!', alertLink : 'http://www.booking.com/alert/523244644', occupancy : 3, pricePerRoom : 66.66},
        {roomName : 'Basic Family Room', status : '-', occupancy : 1, pricePerRoom : 45.66},
        {roomName : 'Deluxe 2 Bed', status : 'We have a new deal for you!', dealLink : 'http://www.booking.com/deal/7838476843', occupancy : 2, pricePerRoom : 109.99},
        {roomName : 'Deluxe Family Room', status : '-', occupancy : 7, pricePerRoom : 112.99}
      ],
      reviews : [
        {
          score : 5,
          text : 'Pellentesque ligula nibh, lacinia eget pharetra ut, vulputate vitae odio. Donec non mattis nisi. Pellentesque elit leo, tincidunt nec felis vitae, aliquet imperdiet purus. In elit ante, vestibulum non accumsan at, volutpat eget dolor. Quisque ut tincidunt elit. Curabitur rutrum dignissim enim ac aliquet. Curabitur et aliquam nisl.',
          userName : 'Malcolm Reynolds'
        },
        {
          score : 8,
          text : 'Duis ac nisi id lorem rhoncus tempus eu sit amet nisi. Aenean ultrices congue ligula, ac molestie velit ultricies a. Nulla ac nunc et nisi placerat interdum sit amet ut erat. Integer vulputate nulla id orci cursus, eget ullamcorper justo ultricies. Nulla lorem dui, euismod non porttitor eu, sagittis in lacus. In suscipit lectus non viverra luctus. Pellentesque egestas, dolor at luctus eleifend, velit dui viverra risus, ac rutrum sapien ante at massa. Donec imperdiet consequat laoreet.',
          userName : 'Zoe Washburne'
        },
        {
          score : 3,
          text : 'Etiam posuere, magna sit amet ullamcorper auctor, odio urna tempor velit, sit amet tincidunt lorem diam a velit. Integer a dapibus nunc. In iaculis vel sem ut gravida.',
          userName : 'Hoban Washburne'
        },
        {
          score : 10,
          text : 'Etiam condimentum sodales dui in vestibulum. Vivamus euismod egestas porttitor. Proin dictum tempor euismod. Suspendisse elit nulla, elementum eu ornare in, tempus in massa. Proin elit sem, posuere nec tempor eget, suscipit sit amet dui. Aliquam in vehicula lorem. Praesent vitae vestibulum ante, nec vestibulum metus. Morbi commodo diam in leo semper ornare. Phasellus et diam magna.',
          userName : 'Inara Serra'
        },
        {
          score : 9,
          text : 'Maecenas cursus ut erat vitae vestibulum. Fusce feugiat dignissim augue consequat condimentum. Donec risus felis, ultricies a velit sed, varius ullamcorper enim. Suspendisse ultrices non tortor non lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          userName : 'Jayne Cobb'
        },
        {
          score : 4,
          text : 'Donec adipiscing lacus sed neque cursus ullamcorper. Vestibulum tellus lectus, molestie vitae augue et, egestas convallis mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec porttitor mi vitae mauris aliquam, non accumsan odio tincidunt. Aliquam semper enim quam, ac cursus lectus dignissim vitae. Suspendisse nec rutrum ligula.',
          userName : 'Kaylee Frye'
        },
        {
          score : 7,
          text : 'Nullam et leo placerat lectus fringilla varius vel a lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh eros, blandit at aliquam eu, ullamcorper eu diam. Etiam id viverra lacus, rutrum suscipit nulla. Maecenas adipiscing, mi sit amet iaculis congue, urna massa vestibulum tortor, a tempus nibh tortor id dui.',
          userName : 'Simon Tam'
        },
        {
          score : 2,
          text : 'Maecenas semper, orci eget cursus aliquam, orci tellus sodales urna, nec varius nisi arcu gravida velit. Proin ultrices egestas nunc, eget dapibus erat sollicitudin in. Fusce fermentum dignissim ipsum sollicitudin tincidunt. Aliquam erat volutpat. Suspendisse in ornare ante.',
          userName : 'River Tam'
        },
        {
          score : 10,
          text : 'Nullam purus ante, rhoncus ac malesuada at, bibendum nec urna. Cras lobortis viverra feugiat. Praesent sapien elit, sagittis vel orci sed, congue consequat nulla.',
          userName : 'Derrial Book'
        },
        {
          score : 9,
          text : 'Donec malesuada semper lectus sed sagittis. Sed laoreet consectetur tortor, ac tempus ipsum malesuada non. Aenean dapibus leo sed sapien rhoncus, at dapibus ligula porta. Morbi tincidunt, urna eget ullamcorper aliquam, augue lectus placerat orci, tristique aliquet ipsum nisi id orci. Nulla vulputate lectus justo, eu dapibus lectus sodales ac. Donec volutpat nibh mi. Proin eu justo vitae dolor accumsan ultrices vel non ante.',
          userName : 'Sheriff Bourne'
        },
        {
          score : 3,
          text : 'Sed consectetur, lorem vitae laoreet tempus, neque elit fringilla nisl, nec tempus urna quam eu nulla. Nunc tempor nec magna vel viverra. In dapibus aliquam velit, ut malesuada nibh ornare eget. Suspendisse in risus posuere, hendrerit odio id, tincidunt lacus. Nunc fermentum metus sit amet mauris pellentesque, vitae sollicitudin dui facilisis. Etiam at velit id dolor rhoncus porttitor. Vestibulum quis blandit felis.',
          userName : 'Lawrance Dobson'
        },
        {
          score : 7,
          text : 'Suspendisse in risus posuere, hendrerit odio id, tincidunt lacus. Nunc fermentum metus sit amet mauris pellentesque, vitae sollicitudin dui facilisis. Etiam at velit id dolor rhoncus porttitor. Vestibulum quis blandit felis.',
          userName : 'Jubal Early'
        },
        {
          score : 8,
          text : 'Phasellus venenatis tortor ac lectus dapibus, sit amet pellentesque turpis mollis. Nam laoreet magna non leo facilisis auctor. Fusce neque augue, lobortis eget orci vel, lobortis porta lectus. Fusce venenatis, metus quis accumsan auctor, ipsum lectus volutpat tellus, viverra vulputate risus dolor porta lacus',
          userName : 'Fanty and Mingo'
        },
        {
          score : 1,
          text : 'Sed molestie ipsum ac diam feugiat tempus. Donec sed mi tortor. Donec dolor augue, tincidunt sed dignissim ac, congue ac sapien. Morbi molestie nibh eget neque rutrum tincidunt. Quisque adipiscing pulvinar massa eu laoreet. Aenean ipsum nisl, convallis eget tortor nec, convallis consequat tellus.',
          userName : 'Stitch Hessian'
        },
        {
          score : 10,
          text : 'Etiam porttitor ut massa sit amet pellentesque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur facilisis commodo nulla ut laoreet. Integer vel felis sit amet dolor sollicitudin gravida. Nam quis congue lorem. Aenean quis purus leo. Nunc iaculis enim odio, eu feugiat augue porta sit amet. Fusce quis commodo nisl. Nunc laoreet leo vel egestas volutpat. Suspendisse et cursus leo.',
          userName : 'Fess Higgins'
        },
        {
          score : 9,
          text : 'Nunc vel suscipit mi. Morbi semper diam urna, sit amet elementum turpis egestas nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer aliquet mi at dui blandit accumsan. Aliquam laoreet enim vel volutpat fermentum. Etiam feugiat arcu mi, sed blandit magna dictum vitae. Ut tristique id nunc ut molestie. Curabitur et augue rhoncus, consectetur mauris vel, laoreet sapien.',
          userName : 'Magistrate Higgins'
        },
        {
          score : 6,
          text : 'Mauris in ligula quis orci auctor blandit. Maecenas venenatis quis mi vitae sagittis. Sed tincidunt laoreet mi nec ullamcorper. Pellentesque elementum ut lacus ac iaculis. Sed suscipit ipsum ut bibendum ullamcorper. Cras ac est risus. Praesent in risus velit. Donec placerat hendrerit nibh vitae auctor.',
          userName : 'Dr. Mathias'
        },
        {
          score : 8,
          text : 'Sed ut ipsum in tellus tristique venenatis quis sit amet nibh. Phasellus pretium eget est ac consequat. Vivamus accumsan semper dui, nec vestibulum mauris rutrum sollicitudin. Mauris quis lorem fermentum, dignissim eros faucibus, tempor justo. Donec nec interdum risus.',
          userName : 'Adelei Niska'
        },
        {
          score : 9,
          text : 'Sed felis erat, laoreet vitae tincidunt non, interdum et elit. Nunc sit amet malesuada lorem. Suspendisse sagittis nulla quis elit pulvinar accumsan. Sed massa nibh, consequat ut mi in, consectetur pharetra nisl. Proin adipiscing semper quam, eget vestibulum risus pharetra ut. Ut sed elit neque.',
          userName : 'Tracey Smith'
        },
        {
          score : 4,
          text : 'Nam sit amet elit in nibh faucibus bibendum sed quis metus. Vivamus aliquam orci sed porta rhoncus. Mauris aliquam purus ut gravida gravida. Mauris sit amet quam enim. Aenean fringilla sed ligula luctus adipiscing. Donec ac augue tortor. In ultricies luctus nulla.',
          userName : 'Atherton Wing'
        },
        {
          score : 3,
          text : 'Mauris id adipiscing justo, eget volutpat mauris. Sed lorem ligula, fermentum at interdum eu, pulvinar vel felis. Aliquam malesuada eros augue, at sollicitudin urna accumsan ultrices.',
          userName : 'Monty'
        },
        {
          score : 6,
          text : 'Sed urna est, sagittis eu ligula sit amet, pellentesque lacinia velit. Sed imperdiet enim non risus bibendum semper. Curabitur gravida consequat magna, nec lobortis elit pretium nec. Morbi eget lacus eget ipsum vehicula pharetra. Donec vehicula aliquam euismod. Nulla facilisi. Donec non est nec eros volutpat placerat in et massa.',
          userName : 'Lenore'
        },
        {
          score : 2,
          text : 'Aliquam scelerisque ullamcorper vehicula. Aenean ut aliquam mi, nec faucibus tortor. Aliquam erat volutpat. Pellentesque et pellentesque mi. Aenean sem neque, cursus lacinia lectus in, egestas aliquet lorem. Sed aliquam, dolor in hendrerit fringilla, dui arcu pulvinar orci, non suscipit urna nibh id odio.',
          userName : 'Mr. Universe'
        },
        {
          score : 8,
          text : 'Morbi vel nisi vel nibh rhoncus vestibulum non sagittis nisl. Curabitur varius dolor massa, ut pulvinar mauris blandit a. Phasellus vestibulum arcu turpis, ut consequat risus sagittis ut. Proin non elit sit amet magna lacinia molestie. Sed eget vulputate augue. In hac habitasse platea dictumst. Cras imperdiet leo nec ante dapibus, in mollis risus interdum. Nullam pharetra nibh eu diam tempus, eget lobortis metus vulputate.',
          userName : 'Sir Warwick Harrow'
        },
        {
          score : 9,
          text : 'Curabitur quis augue cursus, cursus massa ac, dapibus magna. Curabitur non sapien vel lorem pellentesque rhoncus. Nam sagittis, metus aliquet malesuada egestas, leo purus cursus turpis, tempor pharetra tellus nibh posuere turpis. Cras viverra, nisi eget ornare suscipit, erat velit facilisis elit, quis interdum justo magna a tortor. Donec condimentum quam id felis sollicitudin porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
          userName : 'Simon Tam'
        },
        {
          score : 10,
          text : 'Quisque eros sapien, tempus vel ullamcorper nec, faucibus eget ante. Curabitur vel velit ac libero tempus fringilla in dignissim ligula. Integer eget laoreet ligula, eget ultricies ligula. Donec convallis augue a dolor sagittis feugiat. Aliquam adipiscing, ipsum eget pulvinar pulvinar, elit nisl vestibulum ligula, id interdum felis sem quis mi. Sed vel leo nisl. Sed consequat pharetra diam, vitae ultrices augue varius ac.',
          userName : 'Dr. Caron'
        },
        {
          score : 8,
          text : 'Etiam elementum at est sit amet sagittis. Curabitur euismod tellus leo, vitae porta justo ultricies vitae. Aliquam posuere nunc sit amet mauris interdum lacinia',
          userName : 'Bridget'
        },
        {
          score : 7,
          text : 'Uspendisse mollis leo et nisl laoreet, a molestie justo consectetur. Aliquam et leo vulputate, tincidunt massa vel, volutpat leo. Suspendisse potenti.',
          userName : 'Bester'
        },
        {
          score : 8,
          text : 'non convallis enim porttitor. Nulla ut fermentum sem. Aliquam tincidunt, dui malesuada venenatis pulvinar, justo tellus tempus nulla, sit amet pretium orci metus sed purus. Phasellus lobortis cursus lacus vitae volutpat. Nulla at velit ut orci varius placerat. Aenean est elit, adipiscing et nunc varius, accumsan tempus magna. Donec consectetur orci nec mattis hendrerit.',
          userName : 'Badger'
        }
      ],
      similarHotels : [
        {
          name : 'Radisson1',
          address : 'Aksaray İstanbul',
          starPoints : 3.5,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'}
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : false,
          link : 'https://www.booking.com/hotel/352466346'
        },
        {
          name : 'Radisson2',
          address : 'Beyoğlu İstanbul',
          starPoints : 4,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'},
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : true,
          link : 'https://www.booking.com/hotel/755573457'
        },
        {
          name : 'Radisson3',
          address : 'Beyoğlu İstanbul',
          starPoints : 4,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'},
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : true,
          link : 'https://www.booking.com/hotel/956343464'
        },
        {
          name : 'Radisson4',
          address : 'Beyoğlu İstanbul',
          starPoints : 4,
          images : [
            {src : 'img/1_thumb.jpg', altText : 'Test alt text 1'},
          ],
          desc : 'Test description',
          facilities : {
            freeWiFi : true,
            swimmingPool : true,
            gym : true,
            concierge : true,
            restaurant : true,
            freeParking : true,
            satelliteTv : false,
            roomService : false
          },
          roomTypes : [
            {roomName : 'Basic 2 Bed', occupancy : 3, pricePerRoom : 66.66},
            {roomName : 'Basic Family Room', occupancy : 1, pricePerRoom : 45.66}
          ],
          reviews : [
            {point : 4, ratingText : 'Lorem ipsum dolor', userName : 'Takinardi Torrichelli'},
            {point : 8, ratingText : 'Sid amed', userName : 'Pessotto İnzaghi'}
          ],
          premium : true,
          link : 'https://www.booking.com/hotel/636456476'
        }
      ]
    }
  };

  /**
  * getData() is a getter for mock data
  *
  * @param {string} key
  */
  this.getData = function (key) {
    return self.data[key];
  }

}
},{}]},{},[3]);
