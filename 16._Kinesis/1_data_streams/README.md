# Python Kinesis Data Stream Example

## Outputs

**Create Stream**
```
ubuntu@adgu:~/awsdevassoc/16._Kinesis/1_data_streams$ python create_stream.py 

> Current Streams
  None

> Creating Test Stream
  Response status code: 200

> Waiting for stream status: ACTIVE
  Status: CREATING
  Status: CREATING
  Status: CREATING
  Status: CREATING
  Status: CREATING
  Status: CREATING
  Status: CREATING
  Status: CREATING
  Status: ACTIVE

> Current Streams
  TestStream

```

**Producer**
```
ubuntu@adgu:~/awsdevassoc/16._Kinesis/1_data_streams$ python producer.py 

> Loading words.json
  Loaded 436 words.

> Sending all words to stream.
  Sending: abroad
  Sending: accouchement
  Sending: advertisement
  Sending: afeard/afeared
  Sending: affright
  Sending: ague
<cut>
```

**Consumer**
```
ubuntu@adgu:~/awsdevassoc/16._Kinesis/1_data_streams$ python consumer.py 
> Polling stream every 500 ms
  Got record: {"definition": "out of doors", "word": "abroad"}
  Got record: {"definition": "birthing", "word": "accouchement"}
  Got record: {"definition": "a notice to readers in a book", "word": "advertisement"}
  Got record: {"definition": "frightened", "word": "afeard/afeared"}
<cut>
```

**Delete Stream**
```
ubuntu@adgu:~/awsdevassoc/16._Kinesis/1_data_streams$ python delete_stream.py 

> Current Streams
  TestStream

> Creating Test Stream
  Response status code: 200

> Waiting for deletion
  Status: DELETING
  Status: DELETING
  Status: DELETING
  Status: DELETING
  Status: DELETING
  Status: DELETING
  Status: DELETING
  Status: DELETING

> Current Streams
  None
```

