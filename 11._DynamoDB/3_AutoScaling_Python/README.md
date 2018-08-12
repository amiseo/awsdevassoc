# PythonExample3
This example creates a DynamoDB table that does not have auto-scaling enabled.  
It then inserts 3000 items into the table and displays the amount of time it took.
It will then pause to have you enable auto-scaling via the web console.
It will then insert 3000 more items and display the amount of time it took.

## Configure
Modify app.py to change Access and Secret Key ID  

## Run
```
python app.py
```

## Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/PythonExample3$ python app.py 
> Current tables
    Olympics
    OlympicsScan

> Creating table
    Created table ARN: arn:aws:dynamodb:us-east-2:146868985163:table/CarsPE

> Waiting for table state: ACTIVE
    Check 0: CREATING
    Check 1: CREATING
    Check 2: CREATING
    Check 3: CREATING
    Check 4: ACTIVE

> Loading cars data from json files
    Cars1: loaded 1500 cars
    Cars2: loaded 5000 cars
    Cars3: loaded 5000 cars

> Inserting 1500 items from cars1
    1400 items remaining
    1200 items remaining
    1000 items remaining
    800 items remaining
    600 items remaining
    400 items remaining
    200 items remaining
    0 items remaining
  It took 9 seconds.

Please head to the AWS Web Console and enable auto-scaling on this table.
Press Enter to continue...

> Inserting 5000 items from cars2
    4800 items remaining
    4600 items remaining
    4400 items remaining
    4200 items remaining
    4000 items remaining
    3800 items remaining
    3600 items remaining
    3400 items remaining
    3200 items remaining
    3000 items remaining
    2800 items remaining
    2600 items remaining
    2400 items remaining
    2200 items remaining
    2000 items remaining
    1800 items remaining
    1600 items remaining
    1400 items remaining
    1200 items remaining
    1000 items remaining
    800 items remaining
    600 items remaining
    400 items remaining
    200 items remaining
    0 items remaining
  It took 547 seconds.

Waiting 3 minutes to do the third insert.

> Inserting 5000 items from cars3
    4800 items remaining
    4600 items remaining
    4400 items remaining
    4200 items remaining
    4000 items remaining
    3800 items remaining
    3600 items remaining
    3400 items remaining
    3200 items remaining
    3000 items remaining
    2800 items remaining
    2600 items remaining
    2400 items remaining
    2200 items remaining
    2000 items remaining
    1800 items remaining
    1600 items remaining
    1400 items remaining
    1200 items remaining
    1000 items remaining
    800 items remaining
    600 items remaining
    400 items remaining
    200 items remaining
    0 items remaining
  It took 21 seconds.
```

