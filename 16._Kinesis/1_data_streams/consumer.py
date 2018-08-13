import boto3    
import time
import json

with open('config.json') as s:
  settings = json.load(s)

kinesis = boto3.client('kinesis', aws_access_key_id = settings["aws_access_key_id"], aws_secret_access_key = settings["aws_secret_access_key"] , region_name = settings["region_name"])


def print_records(response):
  for i in response["Records"]:
    print("  Got record: " + i["Data"])
    

response = kinesis.describe_stream(StreamName=settings["stream_name"])

shard_id = response['StreamDescription']['Shards'][0]['ShardId']

shard_iterator = kinesis.get_shard_iterator(StreamName=settings["stream_name"],
                                                      ShardId=shard_id,
                                                      ShardIteratorType='LATEST')

shard_iterator = shard_iterator['ShardIterator']

print("> Polling stream every 500 ms")
record_response = kinesis.get_records(ShardIterator=shard_iterator, Limit=1)
print_records(record_response)

while 'NextShardIterator' in record_response:
  #print("> Polling stream")
  record_response = kinesis.get_records(ShardIterator=record_response['NextShardIterator'], Limit=1)
  print_records(record_response)
  time.sleep(0.5)
