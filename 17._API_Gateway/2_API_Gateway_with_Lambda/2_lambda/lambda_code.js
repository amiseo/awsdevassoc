var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-2"
});

var ddb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var tableName = "Pets";

exports.handler = (event, context, callback) => {
    var r = {"result":"", "error":""};
    
    console.log(event);
    
    if (event.httpMethod === "GET") {
        //return all pets
        getAllItems(callback);
    } else if (event.httpMethod === "POST") {
        //add a new pet
        try {
            var inputPet = JSON.parse(event.body);
            if (!inputPet) {
                r.error = "Malformed";
                sendResponse(r, callback);
            } else {
                if (!inputPet.id || !inputPet.type || !inputPet.breed || !inputPet.price) {
                    r.error = "Malformed";
                    sendResponse(r, callback);
                } else {
                    putToDDB(inputPet, callback);
                }
            }
        } catch(e) {
            r.error = "Malformed: " + JSON.stringify(e);
            sendResponse(r, callback);
        }
        
    } else {
        r.error = "Unsupported method";
        sendResponse(r, callback);
    }
};

function sendResponse(j, callback) {
    var response = {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type":"application/json", "Access-Control-Allow-Origin":"*" },
        "body": JSON.stringify(j)
    }
    callback(null, response);
}

function getAllItems(callback) {
    
    var params = {
        TableName: tableName,
        ProjectionExpression: "#id, #type, breed, price",
        FilterExpression: "#id > :zero",
        ExpressionAttributeNames: {
            "#id": "id",
            "#type": "type"
        },
        ExpressionAttributeValues: {
             ":zero": 0
        }
    };
    
    docClient.scan(params, function(err, data) {
        if (err) {
            var r = {"result":"", "error":"Unable to query. Error:" + JSON.stringify(err)};
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            sendResponse(r, callback);
        } else {
            var r = [];
            data.Items.forEach(function(item) {
                r.push(item);
            });
            sendResponse(r, callback);
        }
    });
}


function putToDDB(inputPet, callback) {
    var params = {
        TableName: tableName,
        Item: {
            'id' : {N: String(inputPet.id)},
            'type' : {S: inputPet.type},
            'breed' : {S: inputPet.breed},
            'price' : {N: String(inputPet.price)}
        }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        var r = {"result":"", "error":""};
        if (err) {
            console.log("Put Error", err);
            r.error = JSON.stringify(err);
        } else {
            // console.log("Put Success", data);
            r.result = "success";
        }
        sendResponse(r, callback);
    });
}
