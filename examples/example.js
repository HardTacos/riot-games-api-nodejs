var riot = require('../lib/riot-games-api-nodejs.js');

var pathParam = {
    championId : "21",
    freeToPlay : "true",
    summonerId : '5908',
    summonerIds : '5908, 52322873, 44979373',
    teamId : null,
    teamIds : null,
    type : 'RANKED_SOLO_5X5'
}

riot.developerKey = 'afc3b634-a443-4919-adda-a60877f3fa32';

riot.settings = {
   region : 'na'
}

//testChampion();
//testGame();
//testLeague();
testStaticData();
//testLolStatus();
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
    //riot.lolStatus(console.log).shards();
    riot.lolStatus(console.log).region();
}

function realTest(){
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