var restify = require('restify');
var logResponse = require('./logResponse');

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

function logEntryDataStructure() {

    this.raceCodex = 'TEST', //unique identifier for this race
    this.phaseID = 'Final', //heat#1, quarters#1, semi#1, final
    this.sport = 'snowboarding',
    this.event = 'snowboardCross',
    this.indexed = 'Yes', 
    this.temp = '0', //ceclius
    this.precip =  'None', //None, Rain, Light Snow, Heavy Snow
    this.gender =  null,
    this.bibRedStartLane=  0,
    this.bibGreenStartLane=  0,
    this.bibBlueStartLane=  0,
    this.bibBlackStartLane=  0,
    this.bibWhiteStartLane=  0,
    this.bibYellowStartLane=  0,

    this.bibRedHolePosition=  0,
    this.bibGreenHolePosition=  0,
    this.bibBlueHolePosition=  0,
    this.bibBlackHolePosition=  0,
    this.bibWhiteHolePosition=  0,
    this.bibYellowHolePosition=  0,

    this.bibRedSplitPosition=  0,
    this.bibGreenSplitPosition=  0,
    this.bibBlueSplitPosition=  0,
    this.bibBlackSplitPosition=  0,
    this.bibWhiteSplitPosition=  0,
    this.bibYellowSplitPosition=  0,

    this.bibRedFinishPosition=  0,
    this.bibGreenFinishPosition=  0,
    this.bibBlueFinishPosition=  0,
    this.bibBlackFinishPosition=  0,
    this.bibWhiteFinishPosition=  0,
    this.bibYellowFinishPosition=  0
};


function parseQueryToLogEntry(query) {
    var tempLogEntry = new logEntryDataStructure();
    console.log(query);


    tempLogEntry.raceCodex = query.raceCodex; //unique identifier for this race
    tempLogEntry.phaseID = query.phaseID; //heat#1, quarters#1, semi#1, final
    tempLogEntry.sport = query.sport,
    tempLogEntry.event = query.event;
    tempLogEntry.indexed = query.indexed; 
    tempLogEntry.temp = query.temp; //ceclius
    tempLogEntry.precip =  query.precip; //None, Rain, Light Snow, Heavy Snow
    tempLogEntry.gender =  query.gender;
    tempLogEntry.bibRedStartLane=  query.bibRedStartLane || 0;
    tempLogEntry.bibGreenStartLane=  query.bibGreenStartLane|| 0;
    tempLogEntry.bibBlueStartLane=  query.bibBlueStartLane|| 0;
    tempLogEntry.bibBlackStartLane=  query.bibBlackStartLane|| 0;
    tempLogEntry.bibWhiteStartLane=  query.bibWhiteStartLane|| 0;
    tempLogEntry.bibYellowStartLane=  query.bibYellowStartLane|| 0;

    tempLogEntry.bibRedHolePosition=  query.bibRedHolePosition|| 0;
    tempLogEntry.bibGreenHolePosition=  query.bibGreenHolePosition|| 0;
    tempLogEntry.bibBlueHolePosition=  query.bibBlueHolePosition|| 0;
    tempLogEntry.bibBlackHolePosition=  query.bibBlackHolePosition|| 0;
    tempLogEntry.bibWhiteHolePosition=  query.bibWhiteHolePosition|| 0;
    tempLogEntry.bibYellowHolePosition=  query.bibYellowHolePosition|| 0;

    tempLogEntry.bibRedSplitPosition=  query.bibRedSplitPosition|| 0;
    tempLogEntry.bibGreenSplitPosition=  query.bibGreenSplitPosition|| 0;
    tempLogEntry.bibBlueSplitPosition=  query.bibBlueSplitPosition|| 0;
    tempLogEntry.bibBlackSplitPosition=  query.bibBlackSplitPosition|| 0;
    tempLogEntry.bibWhiteSplitPosition=  query.bibWhiteSplitPosition|| 0;
    tempLogEntry.bibYellowSplitPosition=  query.bibYellowSplitPosition|| 0;

    tempLogEntry.bibRedFinishPosition=  query.bibRedFinishPosition|| 0;
    tempLogEntry.bibGreenFinishPosition=  query.bibGreenFinishPosition|| 0;
    tempLogEntry.bibBlueFinishPosition=  query.bibBlueFinishPosition|| 0;
    tempLogEntry.bibBlackFinishPosition=  query.bibBlackFinishPosition|| 0;
    tempLogEntry.bibWhiteFinishPosition=  query.bibWhiteFinishPosition|| 0;
    tempLogEntry.bibYellowFinishPosition=  query.bibYellowFinishPosition|| 0;
    return tempLogEntry;
};



server.get('/', function (req, res){
    console.log("Inbound Request:" , req.query);
    res.header('Access-Control-Allow-Origin', "*");
    if (req.query.raceCodex) {
        var logEntry = parseQueryToLogEntry(req.query);
        logResponse (logEntry);
        statusUpdateResponse = "Data Logging: Race " + req.query.raceCodex + ": Entry Logged";
        console.log( statusUpdateResponse);
        res.send(statusUpdateResponse);
    } else {
        res.send('Invalid RaceID');
    }
    // res.send(session.userData);

});
