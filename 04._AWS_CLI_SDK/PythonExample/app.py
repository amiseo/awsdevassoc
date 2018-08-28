import boto3    

ec2client = boto3.client('ec2', aws_access_key_id ='INSERT_ACCESS', aws_secret_access_key='INSERT_SECRET', region_name='INSERT_REGION')

response = ec2client.describe_instances()

print("InstanceID\t\tPublicIP");
print("---------------------------------------")

for reservation in response["Reservations"]:
    for instance in reservation["Instances"]:
        # The next line will print the entire dictionary object
        #print(instance)
        # The next line will print only the InstanceId and Public IP Address
        if ("PublicIpAddress" in instance): 
            print(instance["InstanceId"] + "\t" + instance["PublicIpAddress"])

