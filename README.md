# infinstagram
Hack the count limit Instagram imposes in its API

# What it does

If you use the Instagram API to make a call, you will only get 33 results back, no matter what you specify in the `count` paramter. This will help you fetch more media than the limit imposes, in exchange for more API calls, which can count against your hourly limit.

It is a bit ugly at the moment, but it works. If I get time, I will turn the parameters into a single object you can pass in; also I will improve on the parameter names. Pull requests are most welcomed to make this look pretty, or add in more functionality.

# How to Use
```js
// Get an instance of a fetcher
var fetcher = new InstagramFetch([--CLIENT ID--]);

// Use the fetcher to fetch images
fetcher.fetch(userId, tag, limit, maxId, prevArr, callback, param, overflowLimit, overflow);

// userId = The user ID of the user you are trying to fetch from
// tag = The tag name to filter by
// maxId = The ID to fetch from
// prevArr = Used internally, just pass in `undefined`
// callBack = A callback you can specify. It will be called with `callback(returnObj, param)`, where param is the next arguemtn
// param = See above
// overflowLimit = If you want to show some media in one container, and the rest in another, you can specify how many more to show using this parameter. If unspecified, no overflow will show.
// overflow = Same as `param`, but for the overflow container
// Just pass `undefined` for anything that you don't want to specify
```
