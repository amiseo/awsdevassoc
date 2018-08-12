# NodeExample1
This example creates a basic DynamoDB table and loads 10 items into the table.  The table created in this example uses only a primary key "id", no sort key.  Primary key values must be unique.  

## Install Deps
```
npm install 
sudo apt install sqlite3
```

## Configure
Edit config.json to change Access and Secret Key ID.
Global settings for all apps are in settings.json.

## Run
```
node createtable.js
node producer.js
node consumer.js
```

## Create Table Output
```
ubuntu@adgu:~/awsdevassoc/12._SQS/1_SQS_Node$ node createqueue.js 
> Creating queue named: awsdevqueue
  Success: 
  {"ResponseMetadata":{"RequestId":"2240e741-fda8-5047-a217-b4a9cd2b917b"},"QueueUrl":"https://sqs.us-east-2.amazonaws.com/146868985163/awsdevqueue"}
```

## Producer Output
```
ubuntu@adgu:~/awsdevassoc/12._SQS/1_SQS_Node$ node producer.js 
> Getting queue URL for queue: awsdevqueue
  https://sqs.us-east-2.amazonaws.com/146868985163/awsdevqueue

> Casting 10 votes
  to url: https://sqs.us-east-2.amazonaws.com/146868985163/awsdevqueue
  Note: On send, only errors are logged to the console.  Silence == success

  {"voteId":0,"voteFor":"Jim"}
  {"voteId":1,"voteFor":"Alice"}
  {"voteId":2,"voteFor":"Jim"}
  {"voteId":3,"voteFor":"Sally"}
  {"voteId":4,"voteFor":"John"}
  {"voteId":5,"voteFor":"Jim"}
  {"voteId":6,"voteFor":"Jim"}
  {"voteId":7,"voteFor":"Jim"}
  {"voteId":8,"voteFor":"Alice"}
  {"voteId":9,"voteFor":"John"}
```

## Consumer Output
```
```
