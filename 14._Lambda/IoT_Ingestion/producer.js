var AWS = require("aws-sdk");
var fs = require("fs");
var request = require("request");

AWS.config.loadFromPath('./config.json');

var settings = JSON.parse(fs.readFileSync("settings.json"));
console.log("\n> Producer update frequency: " + settings.producerFreq + " ms");

var uuids = [ "0100000001", "0100000002" ];
var uuidindex = 0;

//var apiurl = "INSERT_API_URL";
var apiurl = "https://3bw4a34hah.execute-api.us-east-2.amazonaws.com/default/iotIngest";

/*
 * This app sends temperature data to an API gateway endpoint
 */

sendUpdate();
setInterval(sendUpdate, settings.producerFreq);

function sendUpdate() {
  var u = uuids[uuidindex];

  var tc = Math.floor(Math.random() * Math.floor(450)) / 10

  console.log("\n> Sending data to API endpoint: uuid: " + u + " tc: " + tc);

  request(apiurl + "?uuid="+u+"&tc="+tc, function (error, response, body) {
    if (error) console.log('error:', error); // Print the error if one occurred
    console.log('  statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('  body:', body); // Print the HTML for the Google homepage.
  });

  uuidindex++;
  if (uuidindex >= uuids.length) {
    uuidindex = 0;
  }
}
