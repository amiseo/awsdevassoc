var AWS = require("aws-sdk")
var express = require('express')
var bodyParser = require('body-parser')
var AWSXRay = require('aws-xray-sdk');
var xrayExpress = require('aws-xray-sdk-express');
var morgan = require('morgan');

var app = express();
var port = 8080

var sqs = new AWS.SQS({region: 'us-east-2'});
var sqsQueueName = "xrayQueue";
var sqsQueueURL = "";
createSQSQueue();


app.use(xrayExpress.openSegment('ADGUApp'));
app.use(morgan('short'))
app.use(bodyParser.json())


console.log("> NOTE: this application requires an EC2 role that permits X-Ray, SNS and SQS");


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
    pushToSQS(req.body);
  } else {
    ret.error = "Missing count";
  }
  var segment = AWSXRay.getSegment();
  res.send(ret);
});

/*
 * SQS
 */
function createSQSQueue() {
  console.log("> Creating SQS queue");
  var params = {
    QueueName: sqsQueueName,
    Attributes:{ MessageRetentionPeriod: "120" } // delete messages after 2 minutes
  }

  sqs.createQueue(params, function(err, data) {
    if (err) {
      console.log("Error creating SQS Queue: " + JSON.stringify(err));
    } else {
      console.log("Create SQS Queue resonse: " + JSON.stringify(data));
      sqsQueueURL = data.QueueUrl;
    }
  });
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

app.use(xrayExpress.closeSegment());


app.listen(port, () => console.log(`App listening on port ${port}`))
