# AWS Developer Associate - DynamoDB

The DynamoDB service provides a managed NoSQL database.

## CLI Command Examples
**Help**
```
ubuntu@adgu:~$ aws dynamodb help
NAME
       dynamodb -

DESCRIPTION
       Amazon DynamoDB is a fully managed NoSQL database service that provides
       fast and predictable performance with  seamless  scalability.  DynamoDB
       lets  you offload the administrative burdens of operating and scaling a
       distributed database, so that you don't have to  worry  about  hardware
       provisioning,  setup and configuration, replication, software patching,
       or cluster scaling.
<cut>
```

**List Tables**
```
ubuntu@adgu:~$ aws dynamodb list-tables
{
    "TableNames": [
        "students"
    ]
}
```

**Get Item**  
[https://docs.aws.amazon.com/cli/latest/reference/dynamodb/get-item.html](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/get-item.html)
```
ubuntu@adgu:~$ aws dynamodb get-item --table-name students --key '{"id":{"N":"1"}}'
{
    "Item": {
        "lastname": {
            "S": "Garner"
        }, 
        "birthday": {
            "N": "19790523"
        }, 
        "id": {
            "N": "1"
        }, 
        "firstname": {
            "S": "Nick"
        }
    }
}
```

**Put Item**
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB$ cat put-item.json 
{
  "id": {"N": "10"},
  "firstname": {"S": "John"},
  "lastname": {"S": "Smith"},
  "birthday": {"N": "19821109"}
}

ubuntu@adgu:~/awsdevassoc/11._DynamoDB$ aws dynamodb put-item --table-name students --item file://put-item.json --return-consumed-capacity TOTAL
{
    "ConsumedCapacity": {
        "CapacityUnits": 1.0, 
        "TableName": "students"
    }
}
```

**List all items in table**
```
ubuntu@adgu:~/awsdevassoc/11._DynamoDB$ aws dynamodb scan --table-name students
{
    "Count": 3, 
    "Items": [
        {
            "lastname": {
                "S": "Smith"
            }, 
            "birthday": {
                "N": "19821109"
            }, 
            "id": {
                "N": "10"
            }, 
            "firstname": {
                "S": "John"
            }
        }, 
        {
            "lastname": {
                "S": "Zimoes"
            }, 
            "birthday": {
                "N": "20001122"
            }, 
            "id": {
                "N": "1"
            }, 
            "firstname": {
                "S": "Jack"
            }
        }, 
        {
            "lastname": {
                "S": "garner"
            }, 
            "birthday": {
                "N": "20101122"
            }, 
            "id": {
                "N": "0"
            }, 
            "firstname": {
                "S": "jack"
            }
        }
    ], 
    "ScannedCount": 3, 
    "ConsumedCapacity": null
}
```
