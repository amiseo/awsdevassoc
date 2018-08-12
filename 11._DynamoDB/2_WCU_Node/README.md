# NodeExample2
This example creates a DynamoDB table that does not have auto-scaling enabled.  The table created in this example uses a composite primary key which is a combination of the partition key "id" and sort key "year".  Primary key values must be unique.  This application provides an example of how scaling your provisioned write capacity units for expected use is important.

## Install Deps
```
npm install 
```

## Configure
Edit config.json to change Access and Secret Key ID  

## Run
```
node app.js
```

## Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/NodeExample2$ node app.js 

>>> Loading cars JSON.
Read 19772 items.

>>> Creating DynamoDB table
Created table. Table description JSON: {
  "TableDescription": {
    "AttributeDefinitions": [
      {
        "AttributeName": "id",
        "AttributeType": "N"
      },
      {
        "AttributeName": "year",
        "AttributeType": "N"
      }
    ],
    "TableName": "CarsNE2",
    "KeySchema": [
      {
        "AttributeName": "id",
        "KeyType": "HASH"
      },
      {
        "AttributeName": "year",
        "KeyType": "RANGE"
      }
    ],
    "TableStatus": "CREATING",
    "CreationDateTime": "2018-08-10T01:17:02.813Z",
    "ProvisionedThroughput": {
      "NumberOfDecreasesToday": 0,
      "ReadCapacityUnits": 10,
      "WriteCapacityUnits": 10
    },
    "TableSizeBytes": 0,
    "ItemCount": 0,
    "TableArn": "arn:aws:dynamodb:us-east-2:146868985163:table/CarsNE2",
    "TableId": "b348ea1e-a7ca-4b59-bb73-875334c0df97"
  }
}

>>> Waiting for table state ACTIVE
    Table Status: CREATING
    Table Status: CREATING
    Table Status: CREATING
    Table Status: ACTIVE
    Table is now live, loading data.
>>> Loading 19772 cars into table
Insert complete
19600 items remaining.
19400 items remaining.
19200 items remaining.
19000 items remaining.
18800 items remaining.
18600 items remaining.
18400 items remaining.
18200 items remaining.
18000 items remaining.
17800 items remaining.
17600 items remaining.
17400 items remaining.
17200 items remaining.
17000 items remaining.
16800 items remaining.
16600 items remaining.

Inserts are probably going pretty slow right now.  Kill the app, delete the table, change 'var wcu' to 100, and run it again.
Observe the change in insert speed.
```
