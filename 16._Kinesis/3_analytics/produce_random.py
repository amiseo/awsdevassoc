import boto3    
import time
import json
import random

stream_name = "SensorData"
partition_key = "123"

print("\n> NOTE: This example runs in us-east-1 (N. VA)")

with open('config.json') as s:
  settings = json.load(s)

kinesis = boto3.client('kinesis', aws_access_key_id = settings["aws_access_key_id"], aws_secret_access_key = settings["aws_secret_access_key"] , region_name = settings["aws_region"])

data = {"uid": "", "ts": "1539876750", "ay": "-1.0156", "ax": "0.0000", "az": "0.0156", "tc": "2.9375"}

for x in range(10):
  data["uid"] += str(random.randint(0,9))


def put_to_stream(payload):
  put_response = kinesis.put_record(
                      StreamName=stream_name,
                      Data=json.dumps(payload),
                      PartitionKey=partition_key)

print("\n> Pushing one data entry to stream.")
print("    Pushing:\n\t" + json.dumps(data))

try:
  put_to_stream(data)
except:
  print("\n> Exception caught.  Is the stream created?\n")
