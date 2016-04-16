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