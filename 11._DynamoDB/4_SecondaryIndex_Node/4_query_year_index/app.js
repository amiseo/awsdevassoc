var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var docClient = new AWS.DynamoDB.DocumentClient();

var tableName = "Olympics";
var indexName = "YearIndex";
var year = 1984;

console.log("\n> Querying the index: " + indexName + " table: "  + tableName + " For: year = " + year);

var startTime = Math.floor(new Date().getTime() / 1000);

var params = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: "#yr = :the_yr",
    ProjectionExpression: "#yr, #nm, noc, evt, medal",
    ExpressionAttributeNames: {
        "#yr": "year",
        "#nm": "name",
    },
    ExpressionAttributeValues: {
         ":the_yr": year
    }
};

docClient.query(params, onQuery);

var count = 0;

function onQuery(err, data) {
  if (err) {
    console.error("Unable to query the index. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    data.Items.forEach(function(item) {
      count++;
      //console.log(JSON.stringify(item));
    });

    if (typeof data.LastEvaluatedKey != "undefined") {
      console.log("    Query succeeded, " + count + " so far.  Query for more...");
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      docClient.query(params, onQuery);
    } else {
      console.log("\n> Query complete.  Found " + count + " items.");
      var stopTime = Math.floor(new Date().getTime() / 1000);
      var duration = stopTime - startTime;
      console.log("    Duration: " + duration + " seconds.\n");
      console.log("\n\nNOTE: don't forget to change your read and write capacity to\na low number if they're still high after running through this example.\n\n");
    }
  }
}
