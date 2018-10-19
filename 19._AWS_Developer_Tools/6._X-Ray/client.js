var request = require('request');

var host = "127.0.0.1";
if (host.length == 0) {
  console.log("Please specify the server IP address.");
  process.exit(1);
}

var url = "http://" + host + ":8080";

sendGet();
setInterval(sendGet, 3000);

var loopCount = 0;

function sendGet() {
  console.log("> Sending GET");
  request(url, function (error, response, body) {
    console.log('  error:', error); // Print the error if one occurred
    console.log('  statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('  body:', body); // Print the HTML for the Google homepage.

    sendPost();
  });
}

function sendPost() {
  var d = {'ts':(new Date).getTime(), 'count':loopCount};
  console.log("> Sending POST: " + JSON.stringify(d));
  request({
    url: url,
    method: "POST",
    json: d
  }, function(error, response, body){
    console.log('  error:', error); // Print the error if one occurred
    console.log('  statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('  body:', body); // Print the HTML for the Google homepage.
    //console.log(body);
  });
  loopCount++;
}
