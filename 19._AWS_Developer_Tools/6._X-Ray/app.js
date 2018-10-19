var express = require('express')
var bodyParser = require('body-parser')

var AWSXRay = require('aws-xray-sdk');
var logger = require('winston');
AWSXRay.setLogger(logger);
var AWS = AWSXRay.captureAWS(require('aws-sdk'))

var sqs = AWSXRay.captureAWSClient(new AWS.SQS({region: 'us-east-2'}));
var sqsQueueURL = "https://sqs.us-east-2.amazonaws.com/146868985163/xrayQueue";

var app = express();
var port = 8080


//app.use(xrayExpress.openSegment('ADGUApp'));
app.use(AWSXRay.express.openSegment('ADGUApp'));
app.use(bodyParser.json())


console.log("> NOTE: this application requires an EC2 role that permits X-Ray, SNS and SQS");

/* 
 * Routes
 */
app.get('/', function (req, res) {
  var ret = {'error':'', 'result':''};
  res.send(ret);
});

app.post('/', function (req, res) {
  if (req.body) {
    console.log("> Received POST with data: " + JSON.stringify(req.body));
  }

  var ret = {'error':'', 'result':''};

  if (req.body.count != null) {
    ret.result = "You sent count: " + req.body.count;
    pushToSQS(req.body);
  } else {
    ret.error = "Missing count";
  }

  res.send(ret);
});

/*
 * SQS
 */
if (sqsQueueURL.length == 0) {
  console.log("Please specify the sqsQueueURL. Exiting.");
  process.exit(1);
}

function pushToSQS(data) {

  var params = { 
    MessageBody: JSON.stringify(data),
    QueueUrl: sqsQueueURL, 
    DelaySeconds: 0,
    MessageAttributes: {
      'epochms': {
        DataType: 'Number',
        StringValue: String(new Date().getTime())
      }   
    }   
  };  
  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error sending SQS message: " + JSON.stringify(err));
    } else {
      console.log("Pushed to SQS");
    }
  });
}

app.use(AWSXRay.express.closeSegment());
app.listen(port, () => console.log(`App listening on port ${port}`))
