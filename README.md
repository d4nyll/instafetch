# instafetch
Hack the count limit Instagram imposes in its API

# What it does

If you use the Instagram API to make a call, you will only get 33 results back, no matter what you specify in the `count` paramter. Instafetch will help you fetch more media than the limit imposes, in exchange for more API calls, which can count against your hourly limit.

# How to Use
```js
$(function() {
  // Create a callback that simply logs the response and parameters
  var displayInstaBlocks = function(response, params) {
    console.log(response);
    console.log(params);
  };

  // Get an instance of a fetcher
  var fetcher = new Instafetch('[--CLIENT ID--]');

  // Fetch results
  fetcher.fetch({
    user: [--USER ID--],
    tag: [--TAG NAME--],
    limit: 88,
    callback: displayInstaBlocks,
    params: 'instafeed'
  });
});
```

## Options

| option   | Type     | description                                                                                                                                                                                                                                                             | Required?                                   |
|----------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| user     | int      | The ID of the user whose media you are fetching                                                                                                                                                                                                                         | At least one of `user` or `tag` is required |
| tag      | string   | A single tag                                                                                                                                                                                                                                                            | At least one of `user` or `tag` is required |
| maxId    | string   | If specified, instafetch will only fetch media older than the media with this ID                                                                                                                                                                                        | No                                          |
| callback | function | Create a function and pass it (without `()`) into the fetcher. This will be called once the results are ready. It should accept two arguments - the first is the response object from the fetch, and the second are the arguments passed in from the `params` property. | Yes                                         |
| params   | object   | An object that will be passed into the callback.                                                                                                                                                                                                                        |                                             |