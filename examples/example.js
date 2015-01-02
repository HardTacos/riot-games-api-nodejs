var riot = require('../lib/riot-games-api-nodejs.js');
//var querystring = require('querystring')

var pathParam = {
    championId : "21",
    freeToPlay : "true",
    summonerId : '5908',
    summonerIds : '5908,52322873,44979373',
    summonerName : 'Dyrus',
    summonerNames : 'Dyrus,I DIED TO WOLVES,InsertSmurfHere',
    teamId : 'TEAM-c80824c9-c568-42de-bdbb-271543b209e1',
    teamIds : null,
    type : 'RANKED_SOLO_5X5'
}

riot.developerKey = 'YOUR KEY GOES HERE';

riot.settings = {
   region : 'na'
}

//testChampion();
//testGame();
//testLeague();
//testStaticData();
//testLolStatus();
//testMatch();
//testMatchHistory();
//testStats();
//testSummoner();
testTeam();
//realTest();

function testChampion() {
    riot.champion.all(
        {
            'freeToPlay': pathParam.freeToPlay
        },
        console.log
    );

    riot.champion.id(
        pathParam.championId, {},
        console.log
    )
}

function testGame() {
    riot.game.bySummoner(
        pathParam.summonerId, 
        {},
        console.log
    )
}

function testLeague() {
    riot.league.bySummoner(
        pathParam.summonerId, 
        {},
        console.log
    );
    riot.league.bySummonerEntry(
        pathParam.summonerIds,
        {},
        console.log
    );
    riot.league.byTeam(
        pathParam.teamId,
        {},
        console.log
    );
    riot.league.byTeamEntry(
        pathParam.teamIds,
        {},
        console.log
    );
    riot.league.challenger(
        pathParam.type,
        {},
        console.log
    );
}

function testStaticData() {
    riot.staticData.champions(
        {},
        console.log
    );
    
    riot.staticData.championsId(
        pathParam.championId,
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
}

function testLolStatus(){
    riot.lolStatus(console.log).shards();
    riot.lolStatus(console.log).region();
}

function testMatch(){
    riot.match.match(
        '1681300374',
        {},
        console.log
    )
}

function testMatchHistory(){
    riot.matchHistory.matchHistory(
        pathParam.summonerId,
        {},
        console.log
    )
}

function testStats(){
    riot.stats.ranked(
        pathParam.summonerId,
        {
            season : 'SEASON4'
        },
        console.log
    );
    riot.stats.summary(
        pathParam.summonerId,
        {
            season : 'SEASON4'
        },
        console.log
    )
}

function testSummoner(){
    riot.summoner.byName(
        pathParam.summonerName,
        {},
        console.log
    );
    
    riot.summoner.summonerIds(
        pathParam.summonerId, //or pathParam.summonerIds
        {},
        console.log
    );
    
    riot.summoner.masteries(
        pathParam.summonerId, //or pathParam.summonerIds
        {},
        console.log
    );
    
    riot.summoner.name(
        pathParam.summonerId, //or pathParam.summonerIds
        {},
        console.log
    );
    
    riot.summoner.runes(
        pathParam.summonerId, //or pathParam.summonerIds
        {},
        console.log
    );
}

function testTeam(){
    riot.team.bySummoner(
        pathParam.summonerId,
        {},
        console.log
    );
    
    riot.team.teamIds(
        pathParam.teamId,
        {},
        console.log
    );
}

function gettingDataFromJson(){
    riot.champion.id(
        pathParam.championId,
        {},
        function(err, data) {
            if (err instanceof Error) {
                console.log("Error 1: " + err);
                return 0;
            }
            else {
                var rankedEnabled = data.rankedPlayEnabled;
                if (rankedEnabled == true){
                    console.log('Champion ' + pathParam.championId + ' (Miss Fortune) can be played in ranked');
                } else {
                    console.log('Champion ' + pathParam.championId + ' (Miss Fortune) can not be played in ranked');
                }
            }
        }
    )
}