import boto3    
import time
import json

with open('config.json') as s:
  settings = json.load(s)

kinesis = boto3.client('kinesis', aws_access_key_id = settings["aws_access_key_id"], aws_secret_access_key = settings["aws_secret_access_key"] , region_name = settings["region_name"])

def list_streams():
  print("\n> Current Streams")
  response = kinesis.list_streams()
  if (len(response["StreamNames"])):
    for s in response["StreamNames"]: 
      print("  " + s)
  else:
    print("  None")

list_streams()

print("\n> Creating Test Stream")
response = kinesis.create_stream(StreamName=settings["stream_name"], ShardCount=1)
status = response["ResponseMetadata"]["HTTPStatusCode"]
print("  Response status code: " + str(status))
if (status != 200): 
  print("  It appears there was an error creating the stream.  Exiting.")

print("\n> Waiting for stream status: ACTIVE")
while True:
  #try:
    response = kinesis.describe_stream(StreamName=settings["stream_name"])
    if 'StreamDescription' in response:
      status = response["StreamDescription"]["StreamStatus"]
      print("  Status: " + status)
      if status == "ACTIVE":
        break
    time.sleep(2)
  #except: 
    #break


list_streams() 
print("\n")
