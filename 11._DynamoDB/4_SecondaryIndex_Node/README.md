# PythonExample3
This example creates a DynamoDB table and inserts a large data set. 
The partition key for this data is X.
We need to query for all items that contain X which is not the partition key, this requires a scan operation.
We then create another table with the same data and add a secondary index on the key we'll be querying.
The times to query each table for the same data will be compared.

## Configure
Modify app.py to change Access and Secret Key ID  

## Run
```
python app.py
```

## Output
```
```

