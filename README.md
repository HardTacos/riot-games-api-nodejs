riot-games-api-nodejs
==============

Access all information that Riot provides using thier API. This is the simplest
node module that you could possibly use to gather information from Riot.

**Please refer to the [Riot Games Official API](https://developer.riotgames.com/api/methods). 
Also, please note that when an update occures to a specific API that you are using, please report it
[on the github repo](https://github.com/hardtacos/riot-games-api-nodejs/issues).

Installation
------------

### From npm registry

The npm release is always the recent *stable* version.

```
npm install riot-games-api-nodejs
```

```js
var riot = require('riot-games-api-nodejs')
```

### From Github

The code on Github is the most recent version, but may be untested.

````
git clone https://github.com/hardtacos/riot-games-api-nodejs
cd riot-games-api-nodejs
npm install

var riot = require('/path/to/riot-games-api-nodejs')
````

Usage
-----

```js
// load the module
var riot = require('riot-games-api-nodejs')

// search parkour videos
riot.leaugue.bySummoner("na", "123456", {}, console.log)
```

Configuration
-------------

* `httpProtocol` (string)

Which HTTP protocol to use: `http` (default) or `https`

* `timeout` (integer)

Destroy the request after this number of *milliseconds*. Default: 30000 (30 sec).

* `developerKey` (string)


### Example:

```
var riot = require('riot-games-api-nodejs')
riot.developerKey = '1234578-1234-1234-123456789000'
riot.static.champions( "na", {}, cb );
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
###### Retrieve Champion Information

```js
riot.champion.all(
    "na", {
        'freeToPlay': 'true'
    },
    console.log
);

riot.champion.id(
    "na",
    "21", {},
    console.log
)
```

===========================================================================================


game
----
###### Retrieve recent games by summoner ID

```js
riot.game.bySummoner(
    "na",
    "5908", {},
    console.log
)
```

===========================================================================================


league
----

Retrieve league information for both individuals and teams

```js
riot.league.bySummoner(
    "na",
    "5908", {},
    console.log
);

riot.league.bySummonerEntry(
    "na",
    "5908, xxxxx", {},
    console.log
);

riot.league.byTeam(
    "na",
    "TEAM-c80824c9-c568-42de-bdbb-271543b209e1", {},
    console.log
);

riot.league.byTeamEntry(
    "na",
    "TEAM-c80824c9-c568-42de-bdbb-271543b209e1, xxxxx", {},
    console.log
);

riot.league.challenger(
    "na", {
    	type : 'RANKED_SOLO_5X5'
    },
    console.log
);
```

===========================================================================================


staticData
----

Retrieve static information about League of Legends (i.e. champions, runes, masteries, items, etc...)



...

===========================================================================================


lolStatus
----

Retrieve server statuses

```js
riot.lolStatus(console.log).shards();
riot.lolStatus(console.log).region(settings.region);
```

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
	region       string     used within path