riot-games-api-nodejs
==============

Access all information that Riot provides using thier API. This is the simplest
node module that you could possibly use to gather information from Riot.

Installation
------------

### From npm registry

The npm release is always the recent *stable* version.

```
npm install riot-games-api-nodejs
```

```js
var youtube = require('riot-games-api-nodejs')
```

### From Github

The code on Github is the most recent version, but may be untested.

```

```

```

```


Usage
-----

````
````


Configuration
-------------

* `httpProtocol` (string)

Which HTTP protocol to use: `http` (default) or `https`

* `timeout` (integer)

Destroy the request after this number of *milliseconds*. Default: 30000 (30 sec).

* `developerKey` (string)


### Example:

```

```


Callbacks
---------

Each method takes a `callback` function as last parameter. When everything seems alright `err` 
is null, otherwise `err` will be `instanceof Error` for tracing.

```js
function( err, data ) {
	if( err instanceof Error ) {
		console.log( err )
	} else {
		console.log( data )
	}
}
```

Properties:

	err.message   : the error message
	err.stack     : stack trace
	err.origin    : what it relates to (api, method, request)
	err.details   : api response or other information when available, or `null`

Messages:

	Error: invalid response       api       API response can't be parsed
	Error: not json               api       Expected JSON, received something else
	Error: not found              method    Requested data was not found
	Error: not allowed            method    No permission to requested data
	Error: invalid id             method    Requested video ID is invalid
	Error: connection closed      api       Connection dropped early
	Error: connection error       request   Can't connect to API
	Error: request timeout        request   The request took too long to connect or process
	Error: error                  api       API returned an error, see err.details
	Error: developer key missing  api       developerKey is not set, see Configuration.


===========================================================================================

champion
--------

Retrieve Champion Information

...

===========================================================================================


game
----

Retrieve recent games by summoner ID

...

===========================================================================================


league
----

Retrieve league information for both individuals and teams

...

===========================================================================================


staticData
----

Retrieve static information about League of Legends (i.e. champions, runes, masteries, items, etc...)


...

===========================================================================================


lolStatus
----

Retrieve server statuses

...

===========================================================================================


match
----

Retrieve match by match ID.

...


===========================================================================================


Talk
----
### ( path, [fields], callback, [oldJsonKey] )

Directly talk to the API. This function takes care of connecting and calling the callback only when valid JSON is returned.


	Param        Type       Description
	----------   --------   ----------------------------------------------------
	path         string     full method path without leading slash
	fields       object     GET parameters
	callback     function   callback function to receive results
	oldJsonKey   boolean    force old XML-to-JSON format instead of clean JSON-C
	                        its value is the key containing the expected results