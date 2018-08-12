var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var docClient = new AWS.DynamoDB.DocumentClient();

var tableName = "Olympics";
var year = 1984;

console.log("\n> Scanning table: " + tableName + " For: year = " + year);

var startTime = Math.floor(new Date().getTime() / 1000);

var params = {
    TableName: tableName,
    ProjectionExpression: "#yr, #nm, noc, evt, medal",
    FilterExpression: "#yr = :the_yr",
    ExpressionAttributeNames: {
        "#yr": "year",
        "#nm": "name",
    },
    ExpressionAttributeValues: {
         ":the_yr": year
    }
};

docClient.scan(params, onScan);

var count = 0;

function onScan(err, data) {
  if (err) {
    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    data.Items.forEach(function(item) {
      count++;
      //console.log(JSON.stringify(item));
    });

    // continue scanning if we have more itesm, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("    Scan succeeded, " + count + " so far.  Scanning for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.scan(params, onScan);
    } else {
      console.log("\n> Scan complete.  Found " + count + " items.");
      var stopTime = Math.floor(new Date().getTime() / 1000);
      var duration = stopTime - startTime;
      console.log("    Duration: " + duration + " seconds.\n");
    }
  }
}
