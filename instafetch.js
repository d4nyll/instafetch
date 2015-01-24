var MAX_RETURN = 33;

function Instafetch(clientId) {
  this.clientId = clientId;
  this.baseUrl = 'https://api.instagram.com/v1/';
}

Instafetch.prototype.fetch = function(params) {
  // If a neither tags nor users were specified
  if(!params.hasOwnProperty('tag') && !params.hasOwnProperty('user')) {
    throw Error('Please specify either an user ID or a tag');
  }

  // Initiate a temporary store of the results
  var filteredArr = [];

  // Continuation from previews results, if exists
  if(params.hasOwnProperty('tmpArr') && params.tmpArr.length > 0) {
    filteredArr = params.tmpArr;
  }

  if(!params.hasOwnProperty('limit')) {
    params.limit = MAX_RETURN;
  }

  var parent = this;

  // Build the API URL
  var apiUrl = this.baseUrl;

  // If a user is specified, always get all media by user first
  if(params.hasOwnProperty('user')) {
    apiUrl += 'users/' + params.user + '/media/recent/?client_id=' + this.clientId + '&callback=callbackFunction&count=';
    // If no tags were specified, get based on the limit
    if(!params.hasOwnProperty('tag')) {
      apiUrl += params.limit;
    }
    // Otherwise get as much as possible
    else {
      apiUrl += MAX_RETURN;
    }
  }
  // Otherwise, get the tags based on the limit
  else {
    apiUrl += 'tags/' + params.tag + '/media/recent/?client_id=' + this.clientId + '&callback=callbackFunction&count=' + params.limit;
  }
  
  if (params.hasOwnProperty('maxId')) {
    apiUrl += '&max_id=' + params.maxId;
  }

  // Call the API
  $.ajax({
      url: apiUrl,
      jsonp: "callback",
      dataType: "jsonp",
      data: {
          q: "",
          format: "json"
      },
      success: function(response) {
        /* FILTER */
        // If only one parameter is specified, no need to filter
        if(params.hasOwnProperty('user') != params.hasOwnProperty('tag')) {
          filteredArr = filteredArr.concat(response.data);
        }
        // Otherwise, since user data is always fetched first, filter by tag
        else {
          for(var i = 0; i < response.data.length; i++) {
            if(response.data[i].tags.indexOf(params.tag) > -1) {
              filteredArr.push(response.data[i]);
            }
          }
        }

        /* CHECK */
        // Check if the limit has been reached, or if no more images are available
        if((~~filteredArr.length) >= params.limit || typeof response.pagination.next_max_id === 'undefined') {

          // Structure the returnObj in a similar fashion to how Instagram returns it
          var returnObj = {};
          returnObj.data = [];

          // Ensures only return up to the limit, or the number available, whichever is smaller
          for(var j = 0; j < Math.min(filteredArr.length, params.limit); j++) {
            returnObj.data.push(filteredArr[j]);
          }
          if(params.hasOwnProperty('callback')) {
            params.callback(returnObj, params.params);
          }
        } else {
          parent.fetch({
            user: params.user,
            tag: params.tag,
            limit: params.limit,
            callback: params.callback,
            params: params.params,
            maxId: response.pagination.next_max_id,
            tmpArr: filteredArr
          });
        }
      }
  });
}