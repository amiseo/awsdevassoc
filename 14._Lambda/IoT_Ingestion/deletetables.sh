#!/bin/sh
aws dynamodb delete-table --table-name IoTDeviceSettings
aws dynamodb delete-table --table-name IoTDeviceData
