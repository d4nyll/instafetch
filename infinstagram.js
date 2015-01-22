function InstagramFetch(clientId) {
  this.clientId = clientId;
}

InstagramFetch.prototype.fetch = function(userId, tag, limit, maxId, prevArr, callback, param, overflowLimit, overflow) {
	var filteredArr = [];
	if(typeof prevArr != 'undefined' && prevArr.length > 0) {
		filteredArr	= prevArr;
	}
  var parent = this;
  var apiUrl = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=' + this.clientId + '&callback=callbackFunction&count=' + limit;
  if (typeof maxId != 'undefined') {
    apiUrl += '&max_id=' + maxId;
  }
  // validate input
  jq.ajax({
      url: apiUrl,
      jsonp: "callback",
      dataType: "jsonp",
      data: {
          q: "",
          format: "json"
      },
      success: function(response) {

        // If a tag was defined, filter by tag
        if(typeof tag === 'undefined' || tag == '') {
          filteredArr = filteredArr.concat(response.data);
        } else {
          for(var i = 0; i < response.data.length; i++) {
            if(response.data[i].tags.indexOf(tag) > -1) {
              filteredArr.push(response.data[i]);
            }
          }
        }
        // Check if the limit has been reached, or if no more images are available
        if((+filteredArr.length) >= limit || typeof response.pagination.next_max_id === 'undefined') {
          // Structure the returnObj in a similar fashion to how Instagram returns it
          var returnObj = {};
          returnObj.data = [];
          var returnLimit = Math.min(filteredArr.length, limit);
          for(var j = 0; j < returnLimit; j++) {
            returnObj.data.push(filteredArr[j]);
          }
          callback(returnObj, param);
          if(overflow && overflowLimit) {
          	parent.fetch(userId, tag, overflowLimit, response.pagination.next_max_id, undefined, callback, overflow, undefined, undefined);
          }
        } else {
          parent.fetch(userId, tag, limit, response.pagination.next_max_id, filteredArr, callback, param, overflowLimit, overflow);
        }
      }
  });
}
