import json
import time
import boto3    

# 
# Load config
#
print("\n> Loading config data from config.json")
with open('config.json') as f:
  global config
  config = json.load(f)

tableName = "RoleTest" 

client = boto3.client('dynamodb', region_name = config["region"])

# 
# Load cars1 dict from JSON file
#
print("\n> Loading cars data from json file")
with open('cars1.json') as f:
  global cars1
  cars1 = json.load(f)
print("    Cars1: loaded " + str(len(cars1)) + " cars")


#
# Put first set of items
#
print("\n> Inserting " + str(len(cars1)) + " items from cars1")
firstInsertStart = int(time.time())
tot = len(cars1)
for x in cars1:
  item={'id':{'N':str(x["id"])},'make':{'S':x["make"]},'model':{'S':x["model"]},'year':{'N':str(x["year"])}}
  client.put_item(TableName=tableName, Item=item)
  tot -= 1
  if (tot % 200 == 0):
    print("    " + str(tot) + " items remaining")
firstInsertStop = int(time.time())
print("  It took " + str(firstInsertStop-firstInsertStart) + " seconds.")

