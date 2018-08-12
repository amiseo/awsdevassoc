var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.loadFromPath('./config.json');
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var settings = JSON.parse(fs.readFileSync("settings.json"));

/*
 * This app adds data to the settings table to specify some device information
 */

function loadDeviceSettings(device) {
  console.log(">>> Loading " + device.uuid + " settings into table");
  var params = {
    TableName: settings.deviceSettingsTable,
    Item: {
      "uuid":  device.uuid,
      "tempMax":  device.tempMax,
      "tempMin": device.tempMin,
      "notifyEmail":  device.notifyEmail
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("    Unable to add device: " + device.uuid + ". Error JSON:" + JSON.stringify(err, null, 2));
    } else {
      console.log("    PutItem succeeded:" + device.uuid);
    }
  });
}

var device1 = {
  "uuid": "0100000001",
  "tempMax": 40,
  "tempMin": 35,
  "notifyEmail": "nick@awsdev.guru"
};

var device2 = {
  "uuid": "0100000002",
  "tempMax": 10,
  "tempMin": 2,
  "notifyEmail": "nick@awsdev.guru"
};

loadDeviceSettings(device1);
loadDeviceSettings(device2);

