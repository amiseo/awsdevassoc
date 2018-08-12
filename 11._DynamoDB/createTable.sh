#!/bin/sh
aws dynamodb create-table --table-name CLI_CT --attribute-definitions AttributeName=id,AttributeType=N --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
