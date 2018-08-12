# Role Demo
These scripts are to demonstrate the use of IAM Roles to restrict read/write access  
to DynamoDB

## Configure
Modify config.json to change Access, Secret Key ID and region  

## Run
```
python createtable.py
python loaddata.py
python scantable.py
```

## Create Table Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/5_RoleDemo$ python createtable.py 

> Loading credentials data from config.json

> Current tables
    Olympics

> Creating table
    Created table ARN: arn:aws:dynamodb:us-east-2:146868985163:table/RoleTest

> Waiting for table state: ACTIVE
    Check 0: CREATING
    Check 1: CREATING
    Check 2: CREATING
    Check 3: CREATING
    Check 4: CREATING
    Check 5: CREATING
    Check 6: CREATING
    Check 7: CREATING
    Check 8: ACTIVE

> Current tables
    Olympics
    RoleTest
```

## Load Data Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/5_RoleDemo$ python loaddata.py 

> Loading credentials data from config.json

> Loading cars data from json file
    Cars1: loaded 1500 cars

> Inserting 1500 items from cars1
    1400 items remaining
    1200 items remaining
    1000 items remaining
    800 items remaining
    600 items remaining
    400 items remaining
    200 items remaining
    0 items remaining
  It took 7 seconds.
```


## Scan Table Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/5_RoleDemo$ python scantable.py 

> Loading credentials data from config.json

> Scanning RoleTest for make=HONDA

> Done. Found 66 HONDA cars.
```
