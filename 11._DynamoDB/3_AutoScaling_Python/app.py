import json
import time
import boto3    

tableName = "CarsPE" 

client = boto3.client('dynamodb', aws_access_key_id ='INSERT_KEY_ID', aws_secret_access_key='INSERT_SECRET', region_name='INSERT_REGION')


# 
# List current tables
#
tables = client.list_tables()
print("> Current tables")
for table in tables["TableNames"]:
  print("    " + table)
print("")

#
# Create table
#
print("> Creating table")
response = client.create_table(
    AttributeDefinitions=[ { 'AttributeName': 'id', 'AttributeType': 'N' }, ],
    TableName=tableName,
    KeySchema=[ { 'AttributeName': 'id', 'KeyType': 'HASH' }, ],
    ProvisionedThroughput={ 'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5 },
    SSESpecification={ 'Enabled': False }
)
print("    Created table ARN: " + response["TableDescription"]["TableArn"] + "\n")


#
# Wait for table to be ACTIVE
#
print("> Waiting for table state: ACTIVE")
c = 0
while c < 15:
  table_state = client.describe_table(TableName=tableName)
  state = table_state["Table"]["TableStatus"]
  print("    Check " + str(c) + ": " + state)
  if (state == "ACTIVE"): 
    c = 15
  else:
    c += 1
    time.sleep(1)
  

# 
# Load cars1 and cars2 dict from JSON file
#
print("\n> Loading cars data from json files")
with open('cars1.json') as f:
  global cars1
  cars1 = json.load(f)
with open('cars2.json') as f:
  global cars2
  cars2 = json.load(f)
with open('cars3.json') as f:
  global cars3
  cars3 = json.load(f)
print("    Cars1: loaded " + str(len(cars1)) + " cars")
print("    Cars2: loaded " + str(len(cars2)) + " cars")
print("    Cars3: loaded " + str(len(cars3)) + " cars")


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

#
# Pause
#
print("\nPlease head to the AWS Web Console and enable auto-scaling on this table.")
raw_input("Press Enter to continue...")

#
# Put second set of items
#
print("\n> Inserting " + str(len(cars2)) + " items from cars2")
secondInsertStart = int(time.time())
tot = len(cars2)
for x in cars2:
  item={'id':{'N':str(x["id"])},'make':{'S':x["make"]},'model':{'S':x["model"]},'year':{'N':str(x["year"])}}
  client.put_item(TableName=tableName, Item=item)
  tot -= 1
  if (tot % 200 == 0):
    print("    " + str(tot) + " items remaining")
secondInsertStop = int(time.time())
print("  It took " + str(secondInsertStop-secondInsertStart) + " seconds.")

#
# Pause
#
print("\nWaiting 3 minutes to do the third insert.")
time.sleep(180)

#
# Put third set of items
#
print("\n> Inserting " + str(len(cars3)) + " items from cars3")
thirdInsertStart = int(time.time())
tot = len(cars3)
for x in cars3:
  item={'id':{'N':str(x["id"])},'make':{'S':x["make"]},'model':{'S':x["model"]},'year':{'N':str(x["year"])}}
  client.put_item(TableName=tableName, Item=item)
  tot -= 1
  if (tot % 200 == 0):
    print("    " + str(tot) + " items remaining")
thirdInsertStop = int(time.time())
print("  It took " + str(thirdInsertStop-thirdInsertStart) + " seconds.")
