## Install Deps
```
sudo pip install boto3
```

## Configure
Edit app.py and insert your Access and Secret key and the region.

## Run
```
python app.py
```

## Output
```
ubuntu@adgu:~/awsdevassoc/09._S3/PythonS3$ python app.py 
>> Creating bucket named: adg-44

>>> Create Bucket Response:
{"Location": "http://adg-44.s3.amazonaws.com/", "ResponseMetadata": {"HTTPStatusCode": 200, "RetryAttempts": 0, "HostId": "bQz6+6FhvuURwzEJspp2wxYZZqjNbD0a4n/Yb+UM7KrZxXCZgynFFvP7FNDOvX+18q9fvp/zy+o=", "RequestId": "FC93F4EF284D335E", "HTTPHeaders": {"content-length": "0", "x-amz-id-2": "bQz6+6FhvuURwzEJspp2wxYZZqjNbD0a4n/Yb+UM7KrZxXCZgynFFvP7FNDOvX+18q9fvp/zy+o=", "server": "AmazonS3", "x-amz-request-id": "FC93F4EF284D335E", "location": "http://adg-44.s3.amazonaws.com/", "date": "Tue, 24 Jul 2018 01:43:51 GMT"}}}

>> Creating local files to copy to bucket: ./files/
>>> Creating files/file0.txt
>>> Creating files/file1.txt
>>> Creating files/file2.txt
>>> Creating files/file3.txt
>>> Creating files/file4.txt
>>> Creating files/file5.txt
>>> Creating files/file6.txt
>>> Creating files/file7.txt
>>> Creating files/file8.txt
>>> Creating files/file9.txt

>> Copying new files to S3 bucket: adg-44
>>> Uploading: file7.txt
>>> Setting permissions on: file7.txt
>>> Uploading: file8.txt
>>> Setting permissions on: file8.txt
>>> Uploading: file0.txt
>>> Setting permissions on: file0.txt
>>> Uploading: file2.txt
>>> Setting permissions on: file2.txt
>>> Uploading: file9.txt
>>> Setting permissions on: file9.txt
>>> Uploading: file6.txt
>>> Setting permissions on: file6.txt
>>> Uploading: file3.txt
>>> Setting permissions on: file3.txt
>>> Uploading: file1.txt
>>> Setting permissions on: file1.txt
>>> Uploading: rainbow.jpg
>>> Setting permissions on: rainbow.jpg
>>> Uploading: file4.txt
>>> Setting permissions on: file4.txt
>>> Uploading: file5.txt
>>> Setting permissions on: file5.txt

>> You can now go to the webconsole and see the new bucket and view the files we've just uploaded.
>> e.g. https://s3-us-west-2.amazonaws.com/adg-44/rainbow.jpg
>> Would you like to delete the bucket? <y|n> y

>>> Removing all objects from bucket:
>>>> Deleting: file0.txt
>>>> Deleting: file1.txt
>>>> Deleting: file2.txt
>>>> Deleting: file3.txt
>>>> Deleting: file4.txt
>>>> Deleting: file5.txt
>>>> Deleting: file6.txt
>>>> Deleting: file7.txt
>>>> Deleting: file8.txt
>>>> Deleting: file9.txt
>>>> Deleting: rainbow.jpg

>>> Deleting bucket
>>> Delete Bucket Response:
{"Location": "http://adg-44.s3.amazonaws.com/", "ResponseMetadata": {"HTTPStatusCode": 200, "RetryAttempts": 0, "HostId": "bQz6+6FhvuURwzEJspp2wxYZZqjNbD0a4n/Yb+UM7KrZxXCZgynFFvP7FNDOvX+18q9fvp/zy+o=", "RequestId": "FC93F4EF284D335E", "HTTPHeaders": {"content-length": "0", "x-amz-id-2": "bQz6+6FhvuURwzEJspp2wxYZZqjNbD0a4n/Yb+UM7KrZxXCZgynFFvP7FNDOvX+18q9fvp/zy+o=", "server": "AmazonS3", "x-amz-request-id": "FC93F4EF284D335E", "location": "http://adg-44.s3.amazonaws.com/", "date": "Tue, 24 Jul 2018 01:43:51 GMT"}}}

>> Removing temporary files.
```
