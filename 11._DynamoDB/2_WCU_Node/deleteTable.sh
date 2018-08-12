#!/bin/sh
echo "Attempting to delete table named: CarsNE2"
aws dynamodb delete-table --table-name CarsNE2

