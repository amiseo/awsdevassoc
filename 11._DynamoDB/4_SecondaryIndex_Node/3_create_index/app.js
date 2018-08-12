var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.loadFromPath('./config.json');
var dynamodb = new AWS.DynamoDB();

var tableName = "Olympics"
var statusCheckInterval;

console.log("\n> Creating GSI on year on DynamoDB table: " + tableName);
var params = {
    TableName: tableName,
    AttributeDefinitions:[
        {AttributeName: "year", AttributeType: "N"}
    ],
    GlobalSecondaryIndexUpdates: [
        {
            Create: {
                IndexName: "YearIndex",
                KeySchema: [
                    {AttributeName: "year", KeyType: "HASH"}, //Partition key
                ],
                Projection: {
                    "ProjectionType": "ALL"
                },
                ProvisionedThroughput: {
                    "ReadCapacityUnits": 1000,"WriteCapacityUnits": 1000
                }
            }
        }
    ]
};

var startTime;
var stopTime;
dynamodb.updateTable(params, function(err, data) {
  if (err) {
    console.error("    Unable to update table. Error JSON:", JSON.stringify(err, null, 2));
    process.exit(1);
  } else {
    console.log("    Updated table. Result JSON:", JSON.stringify(data, null, 2));
    console.log("> Checking index status every 30 seconds.  This can take a while");
    checkTable();
    startTime = Math.floor(new Date().getTime() / 1000);
    statusCheckInterval = setInterval(checkTable, 30000);
  }
});

function checkTable() {
  var params = {
    TableName: tableName 
  };

  dynamodb.describeTable(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      //console.log(data);           // successful response
      //console.log(data.Table.GlobalSecondaryIndexes);
      if (data.Table.GlobalSecondaryIndexes) {
        if (data.Table.GlobalSecondaryIndexes.length > 0) {
          var status = data.Table.GlobalSecondaryIndexes[0].IndexStatus;
          console.log("    Index Status: " + status);
          if (status === "ACTIVE") {
            clearInterval(statusCheckInterval);
            console.log("    Index is now live.");
            stopTime = Math.floor(new Date().getTime() / 1000);
            console.log("    Duration: " + stopTime - startTime + " seconds.\n");
          }
        } else {
          console.log("    ! Global secondary index does not exist.");
        }
      }
    }
  });
}
