import boto3
import json
import os
import shutil
from random import randint
import sys

accessKey = 'INSERT_ACCESS_KEY'
secretKey = 'INSERT_SECRET_KEY'
regionName = 'INSERT_REGION_NAME'
bucketName = 'INSERT_BUCKET_NAME'

s3 = boto3.client('s3', aws_access_key_id=accessKey, aws_secret_access_key=secretKey, region_name=regionName)
s3r = boto3.resource('s3', aws_access_key_id=accessKey, aws_secret_access_key=secretKey, region_name=regionName)

# 
# Create a new bucket
#
print(">> Creating bucket named: " + bucketName + "\n")
cbResponse = s3.create_bucket(Bucket=bucketName, ACL='public-read', CreateBucketConfiguration={ 'LocationConstraint': 'us-west-2' })
print(">>> Create Bucket Response:\n" + json.dumps(cbResponse) + "\n")

#
# Create a handful of files to put int the bucket.
#

print(">> Creating local files to copy to bucket: ./files/")
# Create directory
if not os.path.exists("files"):
  os.makedirs("files")

# Copy Rainbow photo
shutil.copyfile("rainbow.jpg", "files/rainbow.jpg")

# Create plain-text files
for x in range(10):
  print(">>> Creating files/file"+str(x)+".txt")
  f = open("files/file"+str(x)+".txt","w+")
  for i in range(randint(5, 100)):
    f.write("File %d Line %d\r\n" % (x, i+1))
  f.close()

print("\n>> Copying new files to S3 bucket: " + bucketName)
for filename in os.listdir("files"):
  print(">>> Uploading: " + filename)
  s3.upload_file(Filename=str("files/"+filename), Bucket=bucketName, Key=filename)
  print(">>> Setting permissions on: " + filename)
  s3r.ObjectAcl(bucketName, filename).put(ACL='public-read')


print("\n>> You can now go to the webconsole and see the new bucket and view the files we've just uploaded.")
print(">> e.g. https://s3-"+regionName+".amazonaws.com/"+bucketName+"/rainbow.jpg")

d = raw_input(">> Would you like to delete the bucket? <y|n> ")
if (d == "y"):
  print("\n>>> Removing all objects from bucket:")
  theBucket = s3r.Bucket(bucketName)
  for object in theBucket.objects.all():
    print(">>>> Deleting: " + object.key)
    # NOTE: You could use s3.delete_objects as well.
    dr = s3.delete_object(Bucket=object.bucket_name, Key=object.key)
    #print("     " + json.dumps(dr));
  print("\n>>> Deleting bucket")
  dbResponse = s3.delete_bucket(Bucket=bucketName)
  print(">>> Delete Bucket Response:\n" + json.dumps(cbResponse) + "\n")

else:
  print("\n\n>>> Leaving bucket alone.  Please remember that you will pay for storage of the files uploaded.")
  print(">>> If you execute this again, with the same bucket name, you will receive an error as the bucket already exists.\n")


#
# Remove files directory
#
print(">> Removing temporary files.")
try:
  shutil.rmtree("files")
except OSError as e:
  print ("Error: %s - %s." % (e.filename, e.strerror))

