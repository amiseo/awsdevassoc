var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.loadFromPath('./config.json');
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var cars; //JSON array of car data

var tableName = "CarsNE1"
var statusCheckInterval;

start();

function start() {
  console.log("");
  loadCarsFromFile();
  createTable();
}

function loadCarsFromFile() {
  console.log(">>> Loading cars JSON.");
  cars = JSON.parse(fs.readFileSync('cars.json', 'utf8'));
  console.log("Read " + cars.length + " items.\n");
}


function createTable() {
  console.log(">>> Creating DynamoDB table");
  var params = {
    TableName : tableName,
    KeySchema: [       
      { AttributeName: "id", KeyType: "HASH"}  //Partition key
    ],
    AttributeDefinitions: [       
      { AttributeName: "id", AttributeType: "N" }
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
      checkTableState();
    }
  });
}

function checkTableState() {
  console.log("\n>>> Waiting for table state ACTIVE");
  statusCheckInterval = setInterval(waitForTableActive, 1000);
}

function waitForTableActive() {
  var params = {
    TableName: tableName
  };
  dynamodb.describeTable(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      if (data.Table) {
        var status = data.Table.TableStatus;
        console.log("    Table Status: " + status);
        if (status === "ACTIVE") {
          clearInterval(statusCheckInterval);
          console.log("    Table is now live, loading data.");
          loadData();
        }   
      }
    }
  });
}

function loadData() {
  console.log("\n>>> Loading " + cars.length + " cars into table");
  cars.forEach(function(car) {
    var params = {
      TableName: tableName,
      Item: {
        "id":  car.id,
        "year":  car.year,
        "make": car.make,
        "model":  car.model
      }
    };

    docClient.put(params, function(err, data) {
      if (err) {
        console.error("    Unable to add car: " + car.model + ". Error JSON:" + JSON.stringify(err, null, 2));
      } else {
        console.log("    PutItem succeeded:" + car.id);
      }
    });
  });
}
