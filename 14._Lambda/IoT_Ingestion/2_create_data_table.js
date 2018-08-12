var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.loadFromPath('./config.json');
var dynamodb = new AWS.DynamoDB();

var settings = JSON.parse(fs.readFileSync("settings.json"));

/*
 * This app creates the DynamoDB tables used for the IoT ingestion demo
 */


var dataTableStatusCheckInterval;

function createDataTable() {
  console.log(">>> Creating DynamoDB table");
  var params = { 
    TableName : settings.deviceDataTable,
    KeySchema: [    
      { AttributeName: "uuid", KeyType: "HASH"},  //Partition key
      { AttributeName: "epoch", KeyType: "RANGE" }  //Sort key
    ],  
    AttributeDefinitions: [    
      { AttributeName: "uuid", AttributeType: "S" },
      { AttributeName: "epoch", AttributeType: "N" }
    ],  
    ProvisionedThroughput: {    
      ReadCapacityUnits: 5,  
      WriteCapacityUnits: 5
    }   
  };  
  
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      if (err.code === "ResourceInUseException") {
        console.log("It appears this table already exists.  Please delete the table first.");
        process.exit(1);
      }   
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
      checkDataTableState();
    }   
  }); 
}

function checkDataTableState() {
  console.log("\n>>> Waiting for data table state ACTIVE");
  dataTableStatusCheckInterval = setInterval(waitForDataTableActive, 1000);
}

function waitForDataTableActive() {
  var params = { 
    TableName: settings.deviceDataTable
  };  
  dynamodb.describeTable(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      if (data.Table) {
        var status = data.Table.TableStatus;
        console.log("    Table Status: " + status);
        if (status === "ACTIVE") {
          clearInterval(dataTableStatusCheckInterval);
          console.log("    Data table is now live.");
        }
      }
    }
  });
}

createDataTable();
