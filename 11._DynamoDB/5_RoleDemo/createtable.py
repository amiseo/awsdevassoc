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
# List current tables
#
tables = client.list_tables()
print("\n> Current tables")
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
# List current tables
#
tables = client.list_tables()
print("\n> Current tables")
for table in tables["TableNames"]:
  print("    " + table)
print("")
