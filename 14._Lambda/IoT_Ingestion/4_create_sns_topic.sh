#!/bin/sh
email="INSERT_EMAIL_ADDRESS"

echo Creating SNS topic named iotAlerts
arn=`aws sns create-topic --name iotAlerts | jq -r '.TopicArn'`
echo Received ARN: $arn
echo Subscribing to topic
aws sns subscribe --topic-arn $arn --protocol email --notification-endpoint $email
