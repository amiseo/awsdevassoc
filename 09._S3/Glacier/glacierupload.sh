#!/bin/bash
#
# This shell script runs through the manual steps to accomplish
# a multi-part upload of a large file to AWS Glaier using the CLI
#
# The script is working on the photo included, photo-mark-harpur.jpg
#

if ! [ -x "$(command -v jq)" ]; then
  echo "Error: Please install jq."
  echo "       https://stedolan.github.io/jq"
  exit 1
fi

# Create a vault
echo
echo ">>> Creating a vault named \"myvault\""
echo "$ aws glacier create-vault --account-id - --vault-name myvault"
aws glacier create-vault --account-id - --vault-name myvault

#Create file
echo
echo ">>> Creating 3MB file"
echo "$ dd if=/dev/urandom of=largefile bs=3145728 count=1"
dd if=/dev/urandom of=largefile bs=3145728 count=1

# Split the file into 1MB chunks
echo
echo ">>> Splitting the file into chunks."
echo "$ split --bytes=1048576 --verbose ./largefile"
split --bytes=1048576 --verbose ./largefile chunk

# Initiate the upload
echo
echo ">>> Initiating multi-part upload"
echo "$ aws glacier initiate-multipart-upload --account-id - --archive-description "multipart upload test" --part-size 1048576 --vault-name myvault"
UPLOADID=`aws glacier initiate-multipart-upload --account-id - --archive-description "multipart upload test" --part-size 1048576 --vault-name myvault | jq -r '.uploadId'`
echo "Received uploadId: $UPLOADID"

# Upload the parts
echo
echo ">>> Manually uploading each part of the file."

echo "$ aws glacier upload-multipart-part --upload-id $UPLOADID --body chunkaa --range 'bytes 0-1048575/*' --account-id - --vault-name myvault"
aws glacier upload-multipart-part --upload-id $UPLOADID --body chunkaa --range 'bytes 0-1048575/*' --account-id - --vault-name myvault

echo "$ aws glacier upload-multipart-part --upload-id $UPLOADID --body chunkab --range 'bytes 1048576-2097151/*' --account-id - --vault-name myvault"
aws glacier upload-multipart-part --upload-id $UPLOADID --body chunkab --range 'bytes 1048576-2097151/*' --account-id - --vault-name myvault

echo "$ aws glacier upload-multipart-part --upload-id $UPLOADID --body chunkac --range 'bytes 2097152-3145727/*' --account-id - --vault-name myvault"
aws glacier upload-multipart-part --upload-id $UPLOADID --body chunkac --range 'bytes 2097152-3145727/*' --account-id - --vault-name myvault

# Generate the tree hash
echo
echo ">>> Manually generating the tree hash"
echo "$ openssl dgst -sha256 -binary chunkaa > hash1"
openssl dgst -sha256 -binary chunkaa > hash1
echo "$ openssl dgst -sha256 -binary chunkab > hash2"
openssl dgst -sha256 -binary chunkab > hash2
echo "$ openssl dgst -sha256 -binary chunkac > hash3"
openssl dgst -sha256 -binary chunkac > hash3
echo "$ cat hash1 hash2 > hash12"
cat hash1 hash2 > hash12
echo "$ openssl dgst -sha256 -binary hash12 > hash12hash"
openssl dgst -sha256 -binary hash12 > hash12hash
echo "$ cat hash12hash hash3 > hash123"
cat hash12hash hash3 > hash123
echo "$ openssl dgst -sha256 hash123"
TREEHASH=`openssl dgst -sha256 hash123 | awk '{print $2}'`
echo TREEHASH: $TREEHASH


# Finalize the upload
echo
echo ">>> Finalizing the upload"
echo "$ aws glacier complete-multipart-upload --checksum $TREEHASH --archive-size 3145728 --upload-id $UPLOADID --account-id - --vault-name myvault"
aws glacier complete-multipart-upload --checksum $TREEHASH --archive-size 3145728 --upload-id $UPLOADID --account-id - --vault-name myvault

# Check Vault Status
echo
echo ">>> Checking Vault Status"
echo "NOTE: Vault status is updated about once per day."
echo "      You may need to wait 24 hours to see your 3MB."
echo "$ aws glacier describe-vault --account-id - --vault-name myvault"
aws glacier describe-vault --account-id - --vault-name myvault

# Remove the chunk files
rm chunk*
rm largefile
rm hash*
