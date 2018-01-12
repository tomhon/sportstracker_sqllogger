var config = require("./config");


var Connection = require('tedious').Connection; 
var Request = require('tedious').Request  
var TYPES = require('tedious').TYPES;  


module.exports = function logResponse (logEntry) {
    console.log('Connecting to SQL');

    //initialize SQL connection
    
    var connection = new Connection(config);  

    //when connection comes up 
    connection.on('connect', function(err) {  
        if (err) {
            console.log(err); 
        } else {
            //if successful execute insert
            console.log("Connected to SQL"); 
            sqlInsertString = createSQLRequest(logEntry);
            console.log(sqlInsertString);
            executeSQLInsert(sqlInsertString);
        }
    }); 

    function executeSQLInsert(sqlString) {
        console.log('Executing SQL Insert');
        request = new Request(sqlString, function(err) {  
                if (err) {  
                console.log(err);
                console.log(sqlString);

                }  
            });  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
                if (column.value === null) {  
                console.log('NULL');  
                } else {  
                console.log("id of inserted item is " + column.value);  
                }  
            });  
        });       
        connection.execSql(request);  
    }

 
};  


function createSQLRequest(userData) {
    var date = new Date();
    sqlRequestString = "INSERT INTO dbo.TestTable (";
            sqlRequestString += "timestamp,";
            sqlRequestString += "username,";
            sqlRequestString += "status,";
            sqlRequestString += "raceCodex,";
            sqlRequestString += "phaseID,"; //racePhase
            sqlRequestString += "sport,";
            sqlRequestString += "event,";
            sqlRequestString += "indexed,";
            sqlRequestString += "temp,";
            sqlRequestString += "precip,";
            sqlRequestString += "gender,";
            sqlRequestString += "bibRedStartLane,";
            sqlRequestString += "bibGreenStartLane,";
            sqlRequestString += "bibBlueStartLane,";
            sqlRequestString += "bibBlackStartLane,";
            sqlRequestString += "bibWhiteStartLane,";
            sqlRequestString += "bibYellowStartLane,";
            sqlRequestString += "bibRedHolePosition,";
            sqlRequestString += "bibGreenHolePosition,";
            sqlRequestString += "bibBlueHolePosition,";
            sqlRequestString += "bibBlackHolePosition,";
            sqlRequestString += "bibWhiteHolePosition,";
            sqlRequestString += "bibYellowHolePosition,";
            sqlRequestString += "bibRedSplitPosition,";
            sqlRequestString += "bibGreenSplitPosition,";
            sqlRequestString += "bibBlueSplitPosition,";
            sqlRequestString += "bibBlackSplitPosition,";
            sqlRequestString += "bibWhiteSplitPosition,";
            sqlRequestString += "bibYellowSplitPosition,";
            sqlRequestString += "bibRedFinishPosition,";
            sqlRequestString += "bibGreenFinishPosition,";
            sqlRequestString += "bibBlueFinishPosition,";
            sqlRequestString += "bibBlackFinishPosition,";
            sqlRequestString += "bibWhiteFinishPosition,";
            sqlRequestString += "bibYellowFinishPosition)";
        sqlRequestString += "VALUES ("
            sqlRequestString += "'" + date.toISOString()  + "',";
            sqlRequestString += "'" + userData.username  + "',";
            sqlRequestString += "'" + userData.status  + "',";
            sqlRequestString += "'" + userData.raceCodex  + "',";
            sqlRequestString += "'" + userData.phaseID  + "',";
            sqlRequestString += "'" + userData.sport  + "',";
            sqlRequestString += "'" + userData.event  + "',";
            sqlRequestString += "'" + userData.indexed  + "',";
            sqlRequestString += "'" + userData.temp  + "',";
            sqlRequestString += "'" + userData.precip  + "',";
            sqlRequestString += "'" + userData.gender  + "',";
            sqlRequestString += "'" + userData.bibRedStartLane  + "',";
            sqlRequestString += "'" + userData.bibGreenStartLane  + "',";
            sqlRequestString += "'" + userData.bibBlueStartLane  + "',";
            sqlRequestString += "'" + userData.bibBlackStartLane  + "',";
            sqlRequestString += "'" + userData.bibWhiteStartLane  + "',";
            sqlRequestString += "'" + userData.bibYellowStartLane  + "',";
            sqlRequestString += "'" + userData.bibRedHolePosition  + "',";
            sqlRequestString += "'" + userData.bibGreenHolePosition  + "',";
            sqlRequestString += "'" + userData.bibBlueHolePosition + "',";
            sqlRequestString += "'" + userData.bibBlackHolePosition + "',";
            sqlRequestString += "'" + userData.bibWhiteHolePosition + "',";
            sqlRequestString += "'" + userData.bibYellowHolePosition + "',";
            sqlRequestString += "'" + userData.bibRedSplitPosition  + "',";
            sqlRequestString += "'" + userData.bibGreenSplitPosition  + "',";
            sqlRequestString += "'" + userData.bibBlueSplitPosition  + "',";
            sqlRequestString += "'" + userData.bibBlackSplitPosition  + "',";
            sqlRequestString += "'" + userData.bibWhiteSplitPosition  + "',";
            sqlRequestString += "'" + userData.bibYellowSplitPosition  + "',";
            sqlRequestString += "'" + userData.bibRedFinishPosition  + "',";
            sqlRequestString += "'" + userData.bibGreenFinishPosition  + "',";
            sqlRequestString += "'" + userData.bibBlueFinishPosition  + "',";
            sqlRequestString += "'" + userData.bibBlackFinishPosition  + "',";
            sqlRequestString += "'" + userData.bibWhiteFinishPosition  + "',";
            sqlRequestString += "'" + userData.bibYellowFinishPosition + "')";
    return sqlRequestString;
}