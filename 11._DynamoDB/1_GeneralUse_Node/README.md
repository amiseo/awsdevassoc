# NodeExample1
This example creates a basic DynamoDB table and loads 10 items into the table.  The table created in this example uses only a primary key "id", no sort key.  Primary key values must be unique.  

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
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/NodeExample1$ node app.js 

>>> Loading cars JSON.
Read 10 items.

>>> Creating DynamoDB table
Created table. Table description JSON: {
  "TableDescription": {
    "AttributeDefinitions": [
      {
        "AttributeName": "id",
        "AttributeType": "N"
      }
    ],
    "TableName": "CarsNE1",
    "KeySchema": [
      {
        "AttributeName": "id",
        "KeyType": "HASH"
      }
    ],
    "TableStatus": "CREATING",
    "CreationDateTime": "2018-08-10T01:13:56.938Z",
    "ProvisionedThroughput": {
      "NumberOfDecreasesToday": 0,
      "ReadCapacityUnits": 5,
      "WriteCapacityUnits": 5
    },
    "TableSizeBytes": 0,
    "ItemCount": 0,
    "TableArn": "arn:aws:dynamodb:us-east-2:146868985163:table/CarsNE1",
    "TableId": "c942052e-755b-4cd9-bd70-175131d0dae4"
  }
}

>>> Waiting for table state ACTIVE
    Table Status: CREATING
    Table Status: ACTIVE
    Table is now live, loading data.

>>> Loading 10 cars into table
    PutItem succeeded:5
    PutItem succeeded:1
    PutItem succeeded:3
    PutItem succeeded:8
    PutItem succeeded:6
    PutItem succeeded:4
    PutItem succeeded:10
    PutItem succeeded:2
    PutItem succeeded:7
    PutItem succeeded:9

```
