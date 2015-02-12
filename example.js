// Bare bone callback
var logResults = function(response, params) {
  console.log(response);
  console.log(params);
};

// Will display the results in square divs
var displayInstaBlocks = function(response, params) {
  console.log(response);
  console.log(params);  // We can pass in any parameter into the callback, here we will pass in the ID of the container
  var data = response.data;
  var container = document.createElement('div');
  var blockList = document.createElement('ul');
  for(var i = 0; i < response.data.length; i++) {
    // List Item
    var listItem = document.createElement('li');

      // Anchor
      var anchor = document.createElement('a');
      anchor.className += ' instaPop';
      anchor.href = "#instaPop-" + params + i.toString();

      // Hidden Inline element
      var popupContainer = document.createElement('div');
      popupContainer.id = "instaPop-" + params + i.toString();
      popupContainer.className += 'lightboxblock mfp-hide';
        //
        // Get the image
        var bigImg = document.createElement('img');
        bigImg.src = response.data[i].images.standard_resolution.url;
        //
        // Get all hashtags
        var hashtagStr = "";
        for (var j = 0; j < response.data[i].tags.length; j++) {
          hashtagStr += '#' + response.data[i].tags[j] + ' ';
        }
        var hashtags = document.createElement('p');
        var hashtagsText = document.createTextNode(hashtagStr);
        hashtags.appendChild(hashtagsText);
        //
        // Get the likes and comments
        var lcDiv = document.createElement('div');
        lcDiv.className += "statsDiv";
        var likesp = document.createElement('p');
        var commentsp = document.createElement('p');
        var likes = document.createTextNode(response.data[i].likes.count);
        var comments = document.createTextNode(response.data[i].comments.count);

        var likeImg = document.createElement('div');
        likeImg.className += ' instaLike';
        var commentImg = document.createElement('div');
        commentImg.className += ' instaComment';

        likesp.appendChild(likes);
        commentsp.appendChild(comments);
        lcDiv.appendChild(likeImg);
        lcDiv.appendChild(likesp);
        lcDiv.appendChild(commentImg);
        lcDiv.appendChild(commentsp);

      popupContainer.appendChild(bigImg);
      popupContainer.appendChild(hashtags);
      popupContainer.appendChild(lcDiv);


        // Image
        var instaImg = document.createElement('img');
        instaImg.src = response.data[i].images.low_resolution.url;

    anchor.appendChild(instaImg);
    anchor.appendChild(popupContainer);
    listItem.appendChild(anchor);
    blockList.appendChild(listItem);
  }
  document.getElementById(params).appendChild(blockList);

  // When clicked, the popup appears
  $('.instaPop').magnificPopup({
    type:'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });
}

$(function() {
  // Get an instance of a fetcher
  var fetcher = new Instafetch('81e3d3f35c8a4438964001decaa5a31f');

  // Fetch results
  fetcher.fetch({
    user: 259220806, // This is the ID for 9gag, you can get the ID from username using http://jelled.com/instagram/lookup-user-id
    tag: '9gag',
    limit: 88,
    callback: displayInstaBlocks, // You can customize your own functionality by building from the logResults method
    params: '9gagBlock'
  });
});