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
