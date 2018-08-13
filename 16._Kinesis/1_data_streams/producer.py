import boto3    
import time
import json

with open('config.json') as s:
  settings = json.load(s)

kinesis = boto3.client('kinesis', aws_access_key_id = settings["aws_access_key_id"], aws_secret_access_key = settings["aws_secret_access_key"] , region_name = settings["region_name"])


print("\n> Loading words.json")
with open('words.json') as f:
  words = json.load(f)
print("  Loaded " + str(len(words)) + " words.")

print("\n> Sending all words to stream.")
for word in words:
  print("  Sending: " + word["word"])
  put_response = kinesis.put_record( StreamName=settings["stream_name"],
                        Data=json.dumps(word),
                        PartitionKey='ABC123')
