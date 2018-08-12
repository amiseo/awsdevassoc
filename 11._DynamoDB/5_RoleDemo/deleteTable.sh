#!/bin/sh
echo "Attempting to delete table named: RoleTest"
aws dynamodb delete-table --table-name RoleTest

