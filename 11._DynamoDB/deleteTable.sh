#!/bin/sh
if [ ${#1} -eq 0 ]; then
  echo "Enter table name."
  exit 1
fi
echo "Attempting to delete table named: $1"
aws dynamodb delete-table --table-name $1

