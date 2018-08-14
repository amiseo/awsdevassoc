# API Gateway Lambda Integration
This Python code creates a table and loads a small dataset.  

## Run
```
python app.py
```

## Output
```
ubuntu@adgu:~/awsdevassoc/17._API_Gateway/2_API_Gateway_with_Lambda/1_create_table$ python app.py 
> Current tables
    Olympics

> Creating table
    Created table ARN: arn:aws:dynamodb:us-east-2:146868985163:table/Pets

> Waiting for table state: ACTIVE
    Check 0: CREATING
    Check 1: CREATING
    Check 2: CREATING
    Check 3: CREATING
    Check 4: CREATING
    Check 5: CREATING
    Check 6: CREATING
    Check 7: ACTIVE
> Loading data from pets.json
  Loaded 20 from file.

> Inserting data
  Adding: dog Labrador
  Adding: cat Siamese
  Adding: fish Betta
  Adding: bird Parrot
  Adding: reptile Gecko
  Adding: dog Bulldog
  Adding: cat Persian
  Adding: fish Goldfish
  Adding: bird Parakeet
  Adding: cat Bengal
  Adding: dog Pug
  Adding: dog Boxer
  Adding: fish Koi
  Adding: bird Lovebird
  Adding: reptile Python
  Adding: fish Shark
  Adding: cat Ragdoll
  Adding: dog Husky
  Adding: dog Dobermann
  Adding: dog Poodle

Done
```

