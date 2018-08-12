Creates a 3MB random file, uploads it to Glacier using only Linux command line tools.

## Run
```
sh glacierupload.sh
```

## Output
```
ubuntu@adgu:~/awsdevassoc/09._S3/Glacier$ ./glacierupload.sh 

>>> Creating a vault named "myvault"
$ aws glacier create-vault --account-id - --vault-name myvault
{
    "location": "/146868985163/vaults/myvault"
}

>>> Creating 3MB file
$ dd if=/dev/urandom of=largefile bs=3145728 count=1
1+0 records in
1+0 records out
3145728 bytes (3.1 MB, 3.0 MiB) copied, 0.243576 s, 12.9 MB/s

>>> Splitting the file into chunks.
$ split --bytes=1048576 --verbose ./largefile
creating file 'chunkaa'
creating file 'chunkab'
creating file 'chunkac'

>>> Initiating multi-part upload
$ aws glacier initiate-multipart-upload --account-id - --archive-description multipart upload test --part-size 1048576 --vault-name myvault
Received uploadId: j7sZvNRRnam6eEHL_cR0WOltjSoJxtAmB6l4S0yujyzt6bE-1bMP_cPy_SzAuoK2KMRhC6hfF8Md8lmRP4cGn6b69WPS

>>> Manually uploading each part of the file.
$ aws glacier upload-multipart-part --upload-id j7sZvNRRnam6eEHL_cR0WOltjSoJxtAmB6l4S0yujyzt6bE-1bMP_cPy_SzAuoK2KMRhC6hfF8Md8lmRP4cGn6b69WPS --body chunkaa --range 'bytes 0-1048575/*' --account-id - --vault-name myvault
{
    "checksum": "d3b1213e6c041179846af7b6a31d7fd4ebf0a5e1f694f2d37c164e087becb95a"
}
$ aws glacier upload-multipart-part --upload-id j7sZvNRRnam6eEHL_cR0WOltjSoJxtAmB6l4S0yujyzt6bE-1bMP_cPy_SzAuoK2KMRhC6hfF8Md8lmRP4cGn6b69WPS --body chunkab --range 'bytes 1048576-2097151/*' --account-id - --vault-name myvault
{
    "checksum": "27a83c0a127a7dee4db7da5e65c80f925e915d38b889acc02454e7568dcf8387"
}
$ aws glacier upload-multipart-part --upload-id j7sZvNRRnam6eEHL_cR0WOltjSoJxtAmB6l4S0yujyzt6bE-1bMP_cPy_SzAuoK2KMRhC6hfF8Md8lmRP4cGn6b69WPS --body chunkac --range 'bytes 2097152-3145727/*' --account-id - --vault-name myvault
{
    "checksum": "b955eff403034c324f8da505385be01b5fbe21451819e5e4ba642d1f930d56d5"
}

>>> Manually generating the tree hash
$ openssl dgst -sha256 -binary chunkaa > hash1
$ openssl dgst -sha256 -binary chunkab > hash2
$ openssl dgst -sha256 -binary chunkac > hash3
$ cat hash1 hash2 > hash12
$ openssl dgst -sha256 -binary hash12 > hash12hash
$ cat hash12hash hash3 > hash123
$ openssl dgst -sha256 hash123
TREEHASH: ac718f871e3a676060fccbb2160e66989e59c7e9888bd580f175a67b13ed9c67

>>> Finalizing the upload
$ aws glacier complete-multipart-upload --checksum ac718f871e3a676060fccbb2160e66989e59c7e9888bd580f175a67b13ed9c67 --archive-size 3145728 --upload-id j7sZvNRRnam6eEHL_cR0WOltjSoJxtAmB6l4S0yujyzt6bE-1bMP_cPy_SzAuoK2KMRhC6hfF8Md8lmRP4cGn6b69WPS --account-id - --vault-name myvault
{
    "archiveId": "degsyzgb0gVEvzIRYyy4bbdrphuzvQ5ixdvtoLH1uIdxi6Lh9L9qgFAj1tYMm0MoC6zlOF3f_iwfatyY1VPMt4j-DDBFWjX46pSnW09yNXmgg0BPYTOY5yanKgWfPv9gx4iHhOXdUQ", 
    "checksum": "ac718f871e3a676060fccbb2160e66989e59c7e9888bd580f175a67b13ed9c67", 
    "location": "/146868985163/vaults/myvault/archives/degsyzgb0gVEvzIRYyy4bbdrphuzvQ5ixdvtoLH1uIdxi6Lh9L9qgFAj1tYMm0MoC6zlOF3f_iwfatyY1VPMt4j-DDBFWjX46pSnW09yNXmgg0BPYTOY5yanKgWfPv9gx4iHhOXdUQ"
}

>>> Checking Vault Status
NOTE: Vault status is updated about once per day.
      You may need to wait 24 hours to see your 3MB.
$ aws glacier describe-vault --account-id - --vault-name myvault
{
    "SizeInBytes": 0, 
    "VaultARN": "arn:aws:glacier:us-east-2:146868985163:vaults/myvault", 
    "NumberOfArchives": 0, 
    "CreationDate": "2018-07-24T03:15:39.545Z", 
    "VaultName": "myvault"
}

```
