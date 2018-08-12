# Secondary Index Demo (Query Index)
This app querys the secondary index for year=1984.
The output of this app should show that scanning the table results in 11,588 items.  
This is the same number of items from the original dataset:  
```
SecondaryIndexDemo/1_create_table/dataset$ grep -c '"year":{"N":"1984"}' athlete_events.puts 
11588
```

When compared to the scan example, this is much faster.

## Install Deps
```
npm install
```

## Run
```
node app.js
```

## Output
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB/SecondaryIndexDemo/4_query_year_index$ node app.js 

> Querying the index: YearIndex table: Olympics For: year = 1984
    Query succeeded, 5753 so far.  Query for more...
    Query succeeded, 11509 so far.  Query for more...

> Query complete.  Found 11588 items.
    Duration: 1 seconds.

```

