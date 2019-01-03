var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();
var sns = new AWS.SNS();

var topicARN = "arn:aws:sns:us-east-2:348985728309:iotAlerts"

exports.handler = (event, context, callback) => {
    putToDDB(event.queryStringParameters.uuid, event.queryStringParameters.tc);

    checkForAlertViolation(event.queryStringParameters.uuid, parseFloat(event.queryStringParameters.tc));

    var r = {"result":"OK"};

    var response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type": "application/json" },
        "body": JSON.stringify(r)
    }
    callback(null, response);
};

function checkForAlertViolation(uuid, tc) {

    var params = {
            TableName: "IoTDeviceSettings",
            Key: {
                'uuid' : {S: uuid},
            },
            ExpressionAttributeNames: {
                "#u": "uuid",
            },
            ProjectionExpression: "#u, tempMax, tempMin, notifyEmail"
        };

    // Call DynamoDB to read the item from the table
    ddb.getItem(params, function(err, data) {
        if(err){
            console.log('Error', err);
        }else{
            console.log('Success', data.item);
            var tcMax = parseFloat(data.item.tempMax.N);
            var tcMin = parseFloat(data.item.tempMin.N);
            console.log('tcMax: ' + tcMax + 'tcMin: ' + tcMin + 'tc: '+ tc);
            if(tc > tcMax){
                console.log('tcMax violated');
                publishToSNS('Alert: UUID: ' + uuid  +' exceeded its maximum temperature threshold of ' + tcMax);
            }else if(tc < tcMin){
                console.log ('tcMin violated');
                publishToSNS('Alert: UUID: ' + uuid  +' fell below its minimum temperature threshold of ' + tcMin);

            }else{
                console.log ('tc in range');
            }
        }
    });
}

function publishToSNS(msg){

    console.log('publishToSNS: '+ msg);

    var params = {
       Message: msg, /* required */
       Subject: 'IoT Ingestion Alert',
       TopicArn: topicARN
    };

    sns.publish(params, function(err, data){
        if (err) console.log(err, err.stack);
        else     console.log('SNS publish result: ' + JSON.stringify(data)); // successful response
    });
}

function putToDDB(uuid, tc) {
    var epoch = Math.floor(new Date().getTime() / 1000);

    var params = {
        TableName: 'IoTDeviceData',
        Item: {
            'uuid' : {S: uuid},
            'epoch' : {N: String(epoch)},
            'tc' : {N: String(tc)}
        }
    };

    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        if (err) {
            console.log("Put Error", err);
        } else {
            // console.log("Put Success", data);
        }
    });
}
