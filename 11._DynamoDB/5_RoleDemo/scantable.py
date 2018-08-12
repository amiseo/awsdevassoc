import json
import time
import boto3    
from boto3.dynamodb.conditions import Key, Attr

# 
# Load config
#
print("\n> Loading config data from config.json")
with open('config.json') as f:
  global config
  config = json.load(f)

tableName = "RoleTest" 
session = boto3.Session(region_name=config["region"])
dynamodb = session.resource('dynamodb')
table = dynamodb.Table(tableName)

print("\n> Scanning " + tableName + " for make=HONDA")

fe = Key('make').eq("HONDA")
pe = "id, #yr, make, model"
ean = { "#yr": "year" }
esk = None

count = 0;

response = table.scan(
      FilterExpression=fe,
      ProjectionExpression=pe,
      ExpressionAttributeNames=ean
    )

for i in response['Items']:
  #print(i)
  count += 1;

while 'LastEvaluatedKey' in response:
    response = table.scan(
        ProjectionExpression=pe,
        FilterExpression=fe,
        ExpressionAttributeNames= ean,
        ExclusiveStartKey=response['LastEvaluatedKey']
      )

    for i in response['Items']:
        #print(i)
        count += 1

print("\n> Done. Found " + str(count) + " HONDA cars.\n");

