var express = require('express')
var bodyParser = require('body-parser')
var AWSXRay = require('aws-xray-sdk');
var xrayExpress = require('aws-xray-sdk-express');
var morgan = require('morgan');

var app = express();
var port = 8080

app.use(xrayExpress.openSegment('ADGUApp'));
app.use(morgan('short'))
app.use(bodyParser.json())


/* 
 * Routes
 */
app.get('/', function (req, res) {
  var ret = {'error':'', 'result':''};
  var segment = AWSXRay.getSegment();
  res.send(ret);
});

app.post('/', function (req, res) {
  if (req.body) {
    console.log("> Received POST with data: " + JSON.stringify(req.body));
  }

  var ret = {'error':'', 'result':''};

  if (req.body.count != null) {
    ret.result = "You sent count: " + req.body.count;
  } else {
    ret.error = "Missing count";
  }
  var segment = AWSXRay.getSegment();
  res.send(ret);
});

app.use(xrayExpress.closeSegment());


app.listen(port, () => console.log(`App listening on port ${port}`))
