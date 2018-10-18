import boto3    
import time
import json

stream_name = "SensorData"
partition_key = "123"

print("\n> NOTE: This example runs in us-east-1 (N. VA)")

with open('config.json') as s:
  settings = json.load(s)

kinesis = boto3.client('kinesis', aws_access_key_id = settings["aws_access_key_id"], aws_secret_access_key = settings["aws_secret_access_key"] , region_name = settings["aws_region"])


#
# Create Stream
try: 
  print("\n> Creating stream.")
  stream = kinesis.create_stream(StreamName=stream_name, ShardCount=1)
  print("    Created stream.")
except:
  print("Caught exception to create_stream, probably exists")

# 
# Wait for stream to be ACTIVE
#
print("\n> Waiting for stream state: ACTIVE")
c = 0 
while c < 30: 
  stream_state = kinesis.describe_stream(StreamName=stream_name)
  state = stream_state["StreamDescription"]["StreamStatus"]
  print("    Check " + str(c) + ": " + state)
  if (state == "ACTIVE"): 
    c = 30
  else:
    c += 1
    time.sleep(2)


def put_to_stream(payload):
  put_response = kinesis.put_record(
                      StreamName=stream_name,
                      Data=json.dumps(payload),
                      PartitionKey=partition_key)

print("\n> Loading sample data data from data.json")
with open('data.json') as d:
  data = json.load(d)
print("  Loaded " + str(len(data)) + " items.")

count = 0

print("\n> Pushing data entries to stream, as fast as possible.")
for item in data:
  print("  Putting entry: " + str(count))
  put_to_stream(item)
  count += 1
