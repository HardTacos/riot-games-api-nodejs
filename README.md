riot-games-api-nodejs
==============

[![NPM](https://nodei.co/npm/riot-games-api-nodejs.png?downloads=true&stars=true)](https://nodei.co/npm/riot-games-api-nodejs/)

Access all information that Riot provides using thier API. This is an extremly simple
node module that allows you to gather information from Riot.

**Please refer to the [Riot Games Official API](https://developer.riotgames.com/api/methods). 
Also, please note that when an update occures to a specific API that you are using, it will 
most likely break. If this happens, please report it [on the github repo](https://github.com/hardtacos/riot-games-api-nodejs/issues).**

Quick Example
-------------
```js
riot.champion.id(
    '21',
    {},
    function(err, data) {
        if (err instanceof Error) {
            console.log("Error 1: " + err);
            return 0;
        }
        else {
            var rankedEnabled = data.rankedPlayEnabled;
            if (rankedEnabled == true){
                console.log('Champion 21 (Miss Fortune) can be played in ranked');
            } else {
                console.log('Champion 21 (Miss Fortune) can not be played in ranked');
            }
        }
    }
)
```

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

// search by summoner id, their league information
riot.leaugue.bySummoner( "123456", {}, console.log)
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
riot.static.champions( {}, cb );
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

champion-v1.2
--------
###### Retrieve Champion Information

```js
riot.champion.all(
     {
        'freeToPlay': 'true'
    },
    console.log
);

riot.champion.id(
    "21", {},
    console.log
)
```

===========================================================================================


game-v1.3
----
###### Retrieve recent games by summoner ID

```js
riot.game.bySummoner(
    
    "5908", {},
    console.log
)
```

===========================================================================================


league-v2.5
----

Retrieve league information for both individuals and teams

```js
riot.league.bySummoner(
    "5908", {},
    console.log
);

riot.league.bySummonerEntry(
    "5908, xxxxx", {},
    console.log
);

riot.league.byTeam(
    "TEAM-c80824c9-c568-42de-bdbb-271543b209e1", {},
    console.log
);

riot.league.byTeamEntry(
    "TEAM-c80824c9-c568-42de-bdbb-271543b209e1, xxxxx", {},
    console.log
);

riot.league.challenger(
    {
    	type : 'RANKED_SOLO_5X5'
    },
    console.log
);
```

===========================================================================================


staticData-v1.2
----

Retrieve static information about League of Legends (i.e. champions, runes, masteries, items, etc...)

```js
riot.staticData.champions(
    {},
    console.log
);

riot.staticData.championsId(
    "21",
    {},
    console.log
);

riot.staticData.item(
    {
        itemData : 'name, description'
    },
    console.log
);

riot.staticData.itemId(
    '3454',
    {
        itemData : 'stats'
    },
    console.log
);
```

===========================================================================================


lolStatus-v1.0
----

Retrieve server statuses

```js
riot.lolStatus(console.log).shards();
riot.lolStatus(console.log).region(settings.region);
```

===========================================================================================


match-v2.2
----
```js
riot.match.match(
    "5908",
    {},
    console.log
)
```

Retrieve match by match ID.


===========================================================================================


matchhistory-v2.2
----
```js
riot.matchHistory.matchHistory(
    "5908",
    {},
    console.log
)
```

Retrieve match history by match ID.


===========================================================================================


stats-v1.3
----

```js
riot.stats.ranked(
    "5908",
    {
        season : 'SEASON4'
    },
    console.log
);

riot.stats.summary(
    "5908",
    {
        season : 'SEASON4'
    },
    console.log
)
```

Retrieve stats by summoner ID.


===========================================================================================


summoner-v1.4
----

```js
riot.summoner.byName(
    'Dyrus', //or 'Dyrus,I DIED TO WOLVES,InsertSmurfHere'
    {},
    console.log
);

riot.summoner.summonerIds(
    '5908' //or '5908,52322873,44979373'
    {},
    console.log
);

riot.summoner.masteries(
    '5908' //or '5908,52322873,44979373'
    {},
    console.log
);

riot.summoner.name(
    '5908' //or '5908,52322873,44979373'
    {},
    console.log
);

riot.summoner.runes(
    '5908' //or '5908,52322873,44979373'
    {},
    console.log
);
```

Retrieve summoner information by summoner name or summonerID.


===========================================================================================


teams-v2.4
----

```js
riot.team.bySummonerId(
    '5908',
    {},
    console.log
);

riot.team.teamId(
    'TEAM-c80824c9-c568-42de-bdbb-271543b209e1', //or multiple teams, separated by commas
    {},
    console.log
);
```

Retrieve teams information by either summonerId or teamID


===========================================================================================


talk
----

Directly talk to the API. This function takes care of connecting and calling the callback only when valid JSON is returned.


	Param        Type       Description
	----------   --------   ----------------------------------------------------
	path         string     full method path without leading slash
	fields       object     GET parameters
	callback     function   callback function to receive results