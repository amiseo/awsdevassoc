import json
import time
import boto3    

tableName = "Olympics" 

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
    ProvisionedThroughput={ 'ReadCapacityUnits': 1000, 'WriteCapacityUnits': 1000 },
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
# Loop through input data and put to ddb
#
print("\n> Inserting data")
with open('./dataset/athlete_events.json', 'rU') as f:
  with table.batch_writer() as batch:
    firstInsertStart = int(time.time())
    count = 0
    for line in f:
      line = line.rstrip()
      item = json.loads(line)
      batch.put_item(Item=item)
      count += 1
      if (count % 10000 == 0):
        print("    Epoch " + str(int(time.time())) + ": " + str(count) + " written to batch_writer.")
    firstInsertStop = int(time.time())
    print("  It took " + str(firstInsertStop-firstInsertStart) + " seconds.")


print("!!! You should go change the provisioned read/write capacity now !!!")
