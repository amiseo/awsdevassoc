var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var dynamodb = new AWS.DynamoDB();

var tableName = "OlympicsScan"

console.log(">>> Checking DynamoDB table: " + tableName);


function checkTable() {
  var params = {
    TableName: tableName /* required */
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
          console.log("Status: " + status);
        } else {
          console.log("Global secondary index does not exist.");
        }
      }
    }
  });
}

checkTable();
var checkInterval = setInterval(checkTable, 30000);



