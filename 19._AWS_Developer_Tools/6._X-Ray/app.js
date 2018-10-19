var express = require('express')
var AWSXRay = require('aws-xray-sdk');
var xrayExpress = require('aws-xray-sdk-express');
var morgan = require('morgan');

var app = express();
var port = 8080


app.use(xrayExpress.openSegment('ADGUApp'));
app.use(morgan('short'))

app.get('/', function (req, res) {
  var result = {'error':'', 'result':''};

  var segment = AWSXRay.getSegment();
  console.log(segment);

  res.send(result);
});

app.use(xrayExpress.closeSegment());

app.listen(port, () => console.log(`App listening on port ${port}`))
