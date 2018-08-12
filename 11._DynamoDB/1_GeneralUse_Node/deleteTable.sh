#!/bin/sh
echo "Attempting to delete table named: CarsNE1"
aws dynamodb delete-table --table-name CarsNE1

