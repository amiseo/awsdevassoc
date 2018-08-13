# AWS Developer Associate - Kinesis
Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. 

## CLI Command Examlpes

### Create a stream
```
ubuntu@adgu:~$ aws kinesis create-stream --stream-name AppStream --shard-count 1
ubuntu@adgu:~$ 
```

### List Streams
```
ubuntu@adgu:~$ aws kinesis list-streams
{
    "StreamNames": [
        "AppStream"
    ]
}
```

### Describe a Stream
```
ubuntu@adgu:~$ aws kinesis describe-stream --stream-name AppStream
{
    "StreamDescription": {
        "KeyId": null, 
        "EncryptionType": "NONE", 
        "StreamStatus": "ACTIVE", 
        "StreamName": "AppStream", 
        "Shards": [
            {
                "ShardId": "shardId-000000000000", 
                "HashKeyRange": {
                    "EndingHashKey": "340282366920938463463374607431768211455", 
                    "StartingHashKey": "0"
                }, 
                "SequenceNumberRange": {
                    "StartingSequenceNumber": "49587251226297793402501605031213146866998395833273024514"
                }
            }
        ], 
        "StreamARN": "arn:aws:kinesis:us-east-2:146868985163:stream/AppStream", 
        "EnhancedMonitoring": [
            {
                "ShardLevelMetrics": []
            }
        ], 
        "StreamCreationTimestamp": 1534124518.0, 
        "RetentionPeriodHours": 24
    }
}
```

### Put a Record
```
ubuntu@adgu:~$ aws kinesis put-record --stream-name AppStream --partition-key 123 --data "Hello, how are you?"
{
    "ShardId": "shardId-000000000000", 
    "SequenceNumber": "49587251226297793402501605031410201775595588085331525634"
}
```

### Get a Record
#### Get shard iterator
```
ubuntu@adgu:~$ aws kinesis get-shard-iterator --shard-id shardId-000000000000 --shard-iterator-type TRIM_HORIZON --stream-name AppStream
{
    "ShardIterator": "AAAAAAAAAAH6xc0dGZmbU7wNXaxsfQO/hED0ipLDOQN0EIqbJBr3gZrlO/l/muTI4PsCra4WBZeYipqGN8k0Dg4J/LAnZ+1/gK3VtpDWKMeG42nSIC/4bz0x2EsBooofxEe76+Evv0l71EQ1nx6NeeubPMgHT2GG+hQ+L8ZR0RAAKgrargLJSra0mSyPlIB+fpLF/mRJPfGjNiwP+XsjvrzXkD40mjqd"
}
```

#### Get record
```
ubuntu@adgu:~$ aws kinesis get-records --shard-iterator AAAAAAAAAAH6xc0dGZmbU7wNXaxsfQO/hED0ipLDOQN0EIqbJBr3gZrlO/l/muTI4PsCra4WBZeYipqGN8k0Dg4J/LAnZ+1/gK3VtpDWKMeG42nSIC/4bz0x2EsBooofxEe76+Evv0l71EQ1nx6NeeubPMgHT2GG+hQ+L8ZR0RAAKgrargLJSra0mSyPlIB+fpLF/mRJPfGjNiwP+XsjvrzXkD40mjqd
{
    "Records": [
        {
            "Data": "SGVsbG8sIGhvdyBhcmUgeW91Pw==", 
            "PartitionKey": "123", 
            "ApproximateArrivalTimestamp": 1534124628.06, 
            "SequenceNumber": "49587251226297793402501605031410201775595588085331525634"
        }
    ], 
    "NextShardIterator": "AAAAAAAAAAGiPUUAvQOn563OWYYaz3QWLpMbVLuRI3vMbqZU93drpz99ujJn9AvFqfSVGtw95bax4wahnqPxEPegmNcFzn1UZWyjvVpvhMf30MWNYsyXkTz8Vb3U2edD/yhlLLJtVPXuqsNXFKAMhbPW8tLHbNxoKpnoU8u++xpWZjndc2b61t6nNXMSZOOOBzc8FH3p5pABXzPWt3hYyR7YCv6JzKoy", 
    "MillisBehindLatest": 0
}
ubuntu@adgu:~$ 

ubuntu@adgu:~$ echo "SGVsbG8sIGhvdyBhcmUgeW91Pw==" | base64 --decode
Hello, how are you?
```

### Delete Stream
```
ubuntu@adgu:~$ aws kinesis delete-stream --stream-name AppStream
ubuntu@adgu:~$ aws kinesis describe-stream --stream-name AppStream
{
    "StreamDescription": {
        "KeyId": null, 
        "EncryptionType": "NONE", 
        "StreamStatus": "DELETING", 
        "StreamName": "AppStream", 
        "Shards": [], 
        "StreamARN": "arn:aws:kinesis:us-east-2:146868985163:stream/AppStream", 
        "EnhancedMonitoring": [
            {
                "ShardLevelMetrics": []
            }
        ], 
        "StreamCreationTimestamp": 1534124518.0, 
        "RetentionPeriodHours": 24
    }
}
ubuntu@adgu:~$ 
```
