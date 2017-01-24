#Instant Static
##A simple API for creating static routes in node JS.
<br/>
Under the hood, it's using express, and the express.static function to create your routes.
<br/>
<br/>
Since that's all the module does, it was easy to keep the API simple!
<hr/>
npm install instant-static --save
<br/>
const iStat = require('instant-static');
<br/>
iStat(configObject, callbackFunction);
<hr/>

```javascript
const iStat = require('instant-static');
iStat({
    preferedPort: 3111, // number - this port is attempted, if it's unavailable, another port will be used.
    localOnly: true, // boolean - true makes this route only available on localhost, false makes it available to the network
    routes: [{ // array of objects - define your routes
        url: '/img', // string - domain:port{{url given}}
        location: `${__dirname}/img` // string - folder that this URL maps to
    }]
}, function(info) {
	console.log(info);
});
```
console.log(info); from above gives the following:
```javascript
{
    port: 3111,
    routes: [{
        url: '/img',
        location: '/Users/Adam/Desktop/_temp/tests/img'
    }],
    localOnly: true
}
```
That's it!
<br/><br/>
Calling the function created our route(s) and when complete, information about the route(s) created is/are reported back in the callback function.

https://github.com/adammeola01/instant-static

https://www.npmjs.com/package/instant-static
