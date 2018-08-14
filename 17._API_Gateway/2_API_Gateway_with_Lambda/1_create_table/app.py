import json
import time
import boto3    

tableName = "Pets" 

session = boto3.Session(aws_access_key_id ='INSERT_KEY_ID', aws_secret_access_key='INSERT_SECRET', region_name='INSERT_REGION');
client = session.client('dynamodb')

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
  

dynamodb = session.resource('dynamodb')
table = dynamodb.Table(tableName)

# 
# Load data from json file
#
print("> Loading data from pets.json")
with open ('./pets.json') as p:
  pets = json.load(p);
print("  Loaded " + str(len(pets)) + " from file.")


# 
# Loop through input data and put to ddb
#
print("\n> Inserting data")
with table.batch_writer() as batch:
  for pet in pets:
    #line = line.rstrip()
    #item = json.loads(line)
    print("  Adding: " + pet["type"] + " " + pet["breed"])
    batch.put_item(Item=pet)

print("\nDone\n")

