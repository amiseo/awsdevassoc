# Secondary Index Demo (Scan)
** NOTE: This example uses a large provisioned write capacity to speed up the data insertion **  
** It's Expensive, change it after getting the data inserted. **
This Python code creates a table and loads a large-ish dataset.  

## Run
```
python app.py
```

## Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/SecondaryIndexDemo/1_create_table$ python app.py 
> Current tables
    OlympicsScan

> Creating table
    Created table ARN: arn:aws:dynamodb:us-east-2:146868985163:table/Olympics

> Waiting for table state: ACTIVE
    Check 0: CREATING
    Check 1: CREATING
    Check 2: CREATING
    Check 3: CREATING
    Check 4: CREATING
    Check 5: ACTIVE

> Inserting data
    Epoch 1533798772: 10000 written to batch_writer.
    Epoch 1533798779: 20000 written to batch_writer.
    Epoch 1533798787: 30000 written to batch_writer.
    Epoch 1533798795: 40000 written to batch_writer.
    Epoch 1533798803: 50000 written to batch_writer.
    Epoch 1533798810: 60000 written to batch_writer.
    Epoch 1533798818: 70000 written to batch_writer.
    Epoch 1533798826: 80000 written to batch_writer.
    Epoch 1533798834: 90000 written to batch_writer.
    Epoch 1533798841: 100000 written to batch_writer.
    Epoch 1533798849: 110000 written to batch_writer.
    Epoch 1533798857: 120000 written to batch_writer.
    Epoch 1533798864: 130000 written to batch_writer.
    Epoch 1533798872: 140000 written to batch_writer.
    Epoch 1533798880: 150000 written to batch_writer.
    Epoch 1533798887: 160000 written to batch_writer.
    Epoch 1533798895: 170000 written to batch_writer.
    Epoch 1533798903: 180000 written to batch_writer.
    Epoch 1533798910: 190000 written to batch_writer.
    Epoch 1533798918: 200000 written to batch_writer.
    Epoch 1533798926: 210000 written to batch_writer.
    Epoch 1533798933: 220000 written to batch_writer.
    Epoch 1533798941: 230000 written to batch_writer.
    Epoch 1533798948: 240000 written to batch_writer.
    Epoch 1533798956: 250000 written to batch_writer.
    Epoch 1533798963: 260000 written to batch_writer.
    Epoch 1533798971: 270000 written to batch_writer.
  It took 208 seconds.
!!! You should go change the provisioned read/write capacity now !!!
```

