var AWS = require('aws-sdk');

var s3 = new AWS.S3();

const BUCKET = "roletest"
const KEY = "file.txt"

var params = {
  Bucket: BUCKET,
  Key: KEY
 };


function run() {
  console.log("Attempting to get " + params.Key + " from bucket: " + params.Bucket + "\n");

  s3.getObject(params, function(err, data) {
    if (err) {
      console.log("An error occurred:");
      console.log(err, err.stack); 
    } else {
      console.log("Success, file data:");
      console.log(data);
      console.log("\nFile contents:");
      console.log(data.Body.toString('utf8'));
    }
  });
}

run();
