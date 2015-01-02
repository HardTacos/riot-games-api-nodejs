/*
Name:         
Description:  
Source:       https://github.com/
Feedback:     https://github.com/
License:      MIT
*/

var xml2json = require('node-xml2json')
var querystring = require('querystring')

var app = {
    httpProtocol: 'https', // http, https
    timeout: 5000, // max execution time in milliseconds
    developerKey: null // RiotGames API Key
}

//////////////
// SETTINGS //
//////////////

app.settings = function(){
    return{
        region : null
    }
}

//////////////
// CHAMPION //
//////////////

app.champion = {

    /**
     * Retrieve all champions (REST)
     *
     * @param {Object} options
     *   {Boolean} freeToPlay
     * @param {Function(!Error, Object)} callback
     */
    all: function(vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.2/champion', vars, cb, app.settings.region)
    },

    /**
     * Retrieve champion by ID (REST)
     *
     * @param {String} id
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    id: function(id, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.2/champion/' + id, vars, cb, app.settings.region)
    }
}

//////////
// GAME //
//////////

app.game = {
    /**
     * Get recent games by summoner ID (REST)
     *
     * @param {String} summonerId
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    bySummoner: function(summonerId, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.3/game/by-summoner/' + summonerId + '/recent', vars, cb, app.settings.region)
    }
}

////////////
// LEAGUE //
////////////

app.league = {
    /**
     * Get leagues mapped by summoner ID for a given liust of summoner IDs (REST)
     *
     * @param {String} summonerIds (comma separated - max 10)
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    bySummoner: function(summonerIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.5/league/by-summoner/' + summonerIds, vars, cb, app.settings.region)
    },
    /**
     * Get league entries mapped by summoner ID for a given list of summoner IDs (REST)
     *
     * @param {String} summonerId (comma separated - max 10)
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    bySummonerEntry: function(summonerIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.5/game/by-summoner/' + summonerIds + '/entry', vars, cb, app.settings.region)
    },
    /**
     * Get leagues mapped by team ID for a given list of team IDs. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    byTeam: function(teamIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.5/league/by-team/' + teamIds, vars, cb, app.settings.region)
    },
    /**
     * Get league entries mapped by team ID for a given list of team IDs. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    byTeamEntry: function(teamIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.5/league/by-team/' + app.settings.region + '/entry', vars, cb, app.settings.region)
    },
    /**
     * Get challenger tier leagues. (REST)
     *
     * @param {Object} options
     *   {String} type (required)
     * @param {Function(!Error, Object)} callback
     */
    challenger: function(vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.5/league/challenger', vars, cb, app.settings.region)
    }
}

/////////////////
// STATIC DATA //
/////////////////

app.staticData = {
    /**
     * Retrieves champion list. (REST)
     *
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {Boolean} dateById
     *   {String} champData
     * @param {Function(!Error, Object)} callback
     */
    champions: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/champion', vars, cb, app.settings.region)
    },
    /**
     * Retrieves a champion by its id. (REST)
     *
     * @param {String} championId
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} champData
     * @param {Function(!Error, Object)} callback
     */
    championsId: function(championId, vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/champion/' + championId, vars, cb, app.settings.region)
    },
    /**
     * Retrieves item list. (REST)
     *
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} itemListData
     * @param {Function(!Error, Object)} callback
     */
    item: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/item', vars, cb, app.settings.region)
    },
    /**
     * Retrieves item by its unique id. (REST)
     *
     * @param {String} itemId
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} itemListData
     * @param {Function(!Error, Object)} callback
     */
    itemId: function(itemId, vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/item/' + itemId, vars, cb, app.settings.region)
    },
    /**
     * Retrieve version data. (REST)
     *
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    languages: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/languages', vars, cb, app.settings.region)
    },
    /**
     * Retrieves mastery list. (REST)
     *
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} masteryData
     * @param {Function(!Error, Object)} callback
     */
    mastery: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/mastery', vars, cb, app.settings.region)
    },
    /**
     * Retrieves mastery item by its unique id. (REST)
     *
     * @param {String} masteryId
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} masteryData
     * @param {Function(!Error, Object)} callback
     */
    masteryId: function(masteryId, vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/mastery/' + masteryId, vars, cb, app.settings.region)
    },
    /**
     * Retrieves realm data. (REST)
     *
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    realm: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/realm', vars, cb, app.settings.region)
    },
    /**
     * Retrieves mastery item by its unique id. (REST)
     *
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} runeListData
     * @param {Function(!Error, Object)} callback
     */
    rune: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/rune', vars, cb, app.settings.region)
    },
    /**
     * Retrieves rune by its unique id. (REST)
     *
     * @param {String} runeId
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} runeListData
     * @param {Function(!Error, Object)} callback
     */
    runeId: function(runeId, vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/rune/' + runeId, vars, cb, app.settings.region)
    },
    /**
     * Retrieves summoner spell list. (REST)
     *
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {Boolean} dataById
     *   {String} spellData
     * @param {Function(!Error, Object)} callback
     */
    summonerSpell: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/summoner-spell', vars, cb, app.settings.region)
    },
    /**
     * Retrieves summoner spell by its unique id. (REST)
     *
     * @param {String} summonerSpellId
     * @param {Object} options
     *   {String} locale
     *   {String} version
     *   {String} spellData
     * @param {Function(!Error, Object)} callback
     */
    summonerSpellId: function(summonerSpellId, vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/summoner-spell/' + summonerSpellId, vars, cb, app.settings.region)
    },
    /**
     * Retrieves version data. (REST)
     *
     * @param {Object} options (null)
     * @param {Function(!Error, Object)} callback
     */
    versions: function(vars, cb) {
        app.talk('api/lol/static-data/' + app.settings.region + '/v1.2/versions', vars, cb, app.settings.region)
    }
}

////////////////
// LOL STATUS //
////////////////

/**
 * 
 * @param {Function(!Error, Object)} callback
 */
app.lolStatus = function(cb) {
    app.httpProtocol = 'http';
    return {
        shards: function() {
            app.lolStatus().talk('shards', {}, cb);
        },
        /**
         * @param {Function(!Error, Object)} callback
         */
        region: function() {
            app.lolStatus().talk('shards/' + app.settings.region, {}, cb)
        },
        talk: function(path, fields, cb, oldJsonKey){
            var complete = false
            // fix callback
        	if( !cb && typeof fields === 'function' ) {
        		var cb = fields;
        		var fields = {}
        	}
        	
        	// fix fields
        	if( !fields || typeof fields !== 'object' ) {
        		var fields = {}
        	}
            // prepare
            var options = {
                hostname: 'status.leagueoflegends.com',
                path: '/' + path,
                method: 'GET'
            }
            var request = require('http').request(options)
                // response
            request.on('response', function(response) {
                var data = []
                var size = 0

                response.on('data', function(chunk) {
                    data.push(chunk)
                    size += chunk.length
                })

                response.on('end', function() {

                    if (complete) {
                        return
                    }
                    else {
                        complete = true
                    }

                    // process buffer and clear mem
                    var buf = new Buffer(size)
                    var pos = 0

                    for (var i = 0; i < data.length; ++i) {
                        data[i].copy(buf, pos)
                        pos += data[i].length
                    }

                    data = buf.toString('utf8').trim()

                    var error = null

                    // validate
                    if (data.match(/^(\{.*\}|\[.*\])$/)) {

                        // ok
                        data = JSON.parse(data)

                        if (data.data !== undefined) {
                            data = data.data
                        }
                        else if (data.error !== undefined) {
                            complete = true
                            error = new Error('error')
                            error.origin = 'api'
                            error.details = data.error
                        }
                        else if (oldJsonKey !== undefined) {
                            if (data[oldJsonKey] === undefined) {
                                complete = true
                                error = new Error('invalid response')
                                error.origin = 'api'
                            }
                            else {
                                data = data[oldJsonKey]
                            }
                        }

                    }
                    else if (data.match(/^<errors .+<\/errors>$/) || data.match(/^<\?xml version.+<\/errors>$/)) {

                        // xml error response
                        data = xml2json.parser(data)

                        // fix for JSONC compatibility
                        complete = true
                        error = new Error('error')
                        error.origin = 'api'
                        error.details = data.errors.error !== undefined ? [data.errors.error] : data.errors

                        error.details.forEach(function(err, errk) {
                            if (err.internalreason !== undefined) {
                                error.details[errk].internalReason = err.internalreason
                                delete error.details[errk].internalreason
                            }
                        })

                    }
                    else if (~data.indexOf('<H2>Error ')) {

                        // html error response
                        complete = true
                        var error = new Error('error')
                        data.replace(/<H1>([^<]+)<\/H1>\n<H2>Error (\d+)<\/H2>/, function(s, reason, code) {
                            error.origin = 'api'
                            error.details = {
                                internalReason: reason,
                                code: code
                            }
                        })

                    }
                    else {

                        // not json
                        complete = true
                        error = new Error('not json')
                        error.origin = 'api'

                    }

                    // parse error
                    if (error && error.origin === 'api' && error.message === 'error') {
                        var errorDetails = error.details
                        if (
                            error.details[0] !== undefined && error.details[0].code !== undefined && error.details[0].code === 'ResourceNotFoundException'
                        ) {
                            complete = true
                            error = new Error('not found')
                            error.origin = 'method'
                            error.details = errorDetails
                        }
                        else if (error.details.code == 403) {
                            complete = true
                            error = new Error('not allowed')
                            error.origin = 'method'
                            error.details = errorDetails
                        }
                        else if (error.details.message === 'Invalid id') {
                            complete = true
                            error = new Error('invalid id')
                            error.origin = 'method'
                            error.details = errorDetails
                        }
                        else if (error.details[0] && error.details[0].internalReason === 'Developer key required for this operation') {
                            complete = true
                            error = new Error('developer key missing')
                            error.origin = 'api'
                            error.details = errorDetails
                        }
                    }

                    // parse response
                    if (data.totalItems !== undefined && data.totalItems == 0) {
                        complete = true
                        error = new Error('not found')
                        error.origin = 'method'
                    }
                    else if (
                        data.feed !== undefined && data.feed['openSearch$totalResults'] !== undefined && data.feed['openSearch$totalResults']['$t'] !== undefined && data.feed['openSearch$totalResults']['$t'] == 0
                    ) {
                        complete = true
                        error = new Error('not found')
                        error.origin = 'method'
                    }

                    // do callback
                    cb(error, data)

                })

                // early disconnect
                response.on('close', function() {
                    if (!complete) {
                        complete = true
                        var err = new Error('connection closed')
                        err.origin = 'api'
                        cb(err)
                    }
                })

            })

            // no endless waiting
            request.setTimeout(app.timeout, function() {
                if (!complete) {
                    complete = true
                    var err = new Error('request timeout')
                    err.origin = 'request'
                    cb(err)
                    request.destroy()
                }
            })

            // connection error
            request.on('error', function(error) {
                if (!complete) {
                    complete = true
                    var err = new Error('connection error')
                    err.origin = 'request'
                    err.details = error
                    cb(err)
                }
            })

            // perform and finish request
            request.end()
        }
    }
}

///////////
// MATCH //
///////////

app.match = {
    /**
     * Retrieves match by matchId. (REST)
     *
     * @param {String} matchId
     * @param {Object} options
     *   {Boolean} includeTimeline
     * @param {Function(!Error, Object)} callback
     */
    match: function(matchId, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.2/match/' + matchId, vars, cb, app.settings.region)
    }
}

//////////////////
// MATCHHISTORY //
//////////////////

app.matchHistory = {
    /**
     * Retrieves match by summonerId. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options
     *   {String} championIds
     *   {String} rankedQueues
     *   {Int} beginIndex
     *   {Int} endIndex
     * @param {Function(!Error, Object)} callback
     */
    matchHistory: function(summonerId, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.2/matchhistory/' + summonerId, vars, cb, app.settings.region)
    }
}

///////////
// STATS //
///////////

app.stats = {
    /**
     * Retrieves ranked stats by summoner ID. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options
     *   {String} season
     * @param {Function(!Error, Object)} callback
     */
    ranked: function(summonerId, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.3/stats/by-summoner/' + summonerId + '/ranked', vars, cb, app.settings.region)
    },
    /**
     * Retrieves players stats summaries by summoner ID. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options
     *   {String} season
     * @param {Function(!Error, Object)} callback
     */
    summary: function(summonerId, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.3/stats/by-summoner/' + summonerId + '/summary', vars, cb, app.settings.region)
    },
    
}

//////////////
// SUMMONER //
//////////////

app.summoner = {
    /**
     * Retrieves summoner objects mapped by standardized summoner name for a given
     * list of summoner names. (REST)
     *
     * @param {String} summonerNames
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    byName: function(summonerNames, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.4/summoner/by-name/' + summonerNames, vars, cb, app.settings.region)
    },
    /**
     * Retrieves summoner objects mapped by summoner ID for a given list of summoner IDs. (REST)
     *
     * @param {String} summonerIds
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    summonerIds: function(summonerIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.4/summoner/' + summonerIds, vars, cb, app.settings.region)
    },
    /**
     * Retrieves mastery pages mapped by summoner ID for a given list of summoner IDs. (REST)
     *
     * @param {String} summonerIds
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    masteries: function(summonerIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.4/summoner/' + summonerIds + '/masteries', vars, cb, app.settings.region)
    },
    /**
     * Retrieves summoner names mapped by summoner ID for a given list of summoner IDs. (REST)
     *
     * @param {String} summonerIds
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    name: function(summonerIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.4/summoner/' + summonerIds + '/name', vars, cb, app.settings.region)
    },
    /**
     * Retrieves rune pages mapped by summoner ID for a given list of summoner IDs. (REST)
     *
     * @param {String} summonerIds
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    runes: function(summonerIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v1.4/summoner/' + summonerIds + '/runes', vars, cb, app.settings.region)
    },
    
}

///////////
// TEAMS //
///////////

app.team = {
    /**
     * Retrieves teams mapped by summoner ID for a given list of summoner IDs. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    bySummoner: function(summonerId, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.4/team/by-summoner/' + summonerId, vars, cb, app.settings.region)
    },
    /**
     * Retrieves teams mapped by team ID for a given list of team IDs. (REST)
     *
     * @param {String} summonerId
     * @param {Object} options
     * @param {Function(!Error, Object)} callback
     */
    teamIds: function(teamIds, vars, cb) {
        app.talk('api/lol/' + app.settings.region + '/v2.4/team/' + teamIds, vars, cb, app.settings.region)
    }
}

/////////////////
// COMMUNICATE //
/////////////////

app.talk = function(path, fields, cb) {

    var complete = false

    function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }

    // fix callback
    if (!cb && typeof fields === 'function') {
        var cb = fields
        var fields = {}
    }

    // fix fields
    if (!fields || typeof fields !== 'object') {
        var fields = {};
    }

    // prepare
    var options = {
        hostname: app.settings.region + '.api.pvp.net',
        path: '/' + path.replace(/ +/g, '%20') + '?' + querystring.stringify(fields) + '&api_key=' + app.developerKey,
        method: 'GET'
    }

    if (app.httpProtocol === 'https') {
        var request = require('https').request(options);
        console.log("Request: " + options.hostname + options.path);
    }
    else {
        var request = require('http').request(options)
    }

    // response
    request.on('response', function(response) {
        var data = []
        var size = 0

        response.on('data', function(chunk) {
            data.push(chunk)
            size += chunk.length
        })

        response.on('end', function() {

            if (complete) {
                return
            }
            else {
                complete = true
            }

            // process buffer and clear mem
            var buf = new Buffer(size)
            var pos = 0

            for (var i = 0; i < data.length; ++i) {
                data[i].copy(buf, pos)
                pos += data[i].length
            }

            data = buf.toString('utf8').trim()

            var error = null

            // validate
            if (data.match(/^(\{.*\}|\[.*\])$/)) {

                // ok
                data = JSON.parse(data)

                if (data.data !== undefined) {
                    data = data.data
                }
                else if (data.error !== undefined) {
                    complete = true
                    error = new Error('error')
                    error.origin = 'api'
                    error.details = data.error
                }
        

            }
            else if (data.match(/^<errors .+<\/errors>$/) || data.match(/^<\?xml version.+<\/errors>$/)) {

                // xml error response
                data = xml2json.parser(data)

                // fix for JSONC compatibility
                complete = true
                error = new Error('error')
                error.origin = 'api'
                error.details = data.errors.error !== undefined ? [data.errors.error] : data.errors

                error.details.forEach(function(err, errk) {
                    if (err.internalreason !== undefined) {
                        error.details[errk].internalReason = err.internalreason
                        delete error.details[errk].internalreason
                    }
                })

            }
            else if (~data.indexOf('<H2>Error ')) {

                // html error response
                complete = true
                var error = new Error('error')
                data.replace(/<H1>([^<]+)<\/H1>\n<H2>Error (\d+)<\/H2>/, function(s, reason, code) {
                    error.origin = 'api'
                    error.details = {
                        internalReason: reason,
                        code: code
                    }
                })

            }
            else {

                // not json
                complete = true
                error = new Error('not json')
                error.origin = 'api'

            }

            // parse error
            if (error && error.origin === 'api' && error.message === 'error') {
                var errorDetails = error.details
                if (
                    error.details[0] !== undefined && error.details[0].code !== undefined && error.details[0].code === 'ResourceNotFoundException'
                ) {
                    complete = true
                    error = new Error('not found')
                    error.origin = 'method'
                    error.details = errorDetails
                }
                else if (error.details.code == 403) {
                    complete = true
                    error = new Error('not allowed')
                    error.origin = 'method'
                    error.details = errorDetails
                }
                else if (error.details.message === 'Invalid id') {
                    complete = true
                    error = new Error('invalid id')
                    error.origin = 'method'
                    error.details = errorDetails
                }
                else if (error.details[0] && error.details[0].internalReason === 'Developer key required for this operation') {
                    complete = true
                    error = new Error('developer key missing')
                    error.origin = 'api'
                    error.details = errorDetails
                }
            }

            // parse response
            if (data.totalItems !== undefined && data.totalItems == 0) {
                complete = true
                error = new Error('not found')
                error.origin = 'method'
            }
            else if (
                data.feed !== undefined && data.feed['openSearch$totalResults'] !== undefined && data.feed['openSearch$totalResults']['$t'] !== undefined && data.feed['openSearch$totalResults']['$t'] == 0
            ) {
                complete = true
                error = new Error('not found')
                error.origin = 'method'
            }

            // do callback
            cb(error, data)

        })

        // early disconnect
        response.on('close', function() {
            if (!complete) {
                complete = true
                var err = new Error('connection closed')
                err.origin = 'api'
                cb(err)
            }
        })

    })

    // no endless waiting
    request.setTimeout(app.timeout, function() {
        if (!complete) {
            complete = true
            var err = new Error('request timeout')
            err.origin = 'request'
            cb(err)
            request.destroy()
        }
    })

    // connection error
    request.on('error', function(error) {
        if (!complete) {
            complete = true
            var err = new Error('connection error')
            err.origin = 'request'
            err.details = error
            cb(err)
        }
    })

    // perform and finish request
    request.end()
}


// ready
module.exports = app
