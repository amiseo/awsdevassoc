# AWS Developer Associate - SNS
The AWS SNS service provides fully managed pub/sub messaging and mobile notifications service.

## CLI Command Examples
**Help**
```
ubuntu@adgu:~$ aws sns help

NAME
       sns -

DESCRIPTION
       Amazon  Simple  Notification Service (Amazon SNS) is a web service that
       enables you to build distributed web-enabled applications. Applications
       can  use  Amazon  SNS to easily push real-time notification messages to
       interested subscribers  over  multiple  delivery  protocols.  For  more
       information  about  this  product  see  http://aws.amazon.com/sns . For
       detailed information about Amazon SNS features and their associated API
       calls, see the Amazon SNS Developer Guide .

```

**Create Topic**
```
ubuntu@adgu:~$ aws sns create-topic --name cli_topic
{
    "TopicArn": "arn:aws:sns:us-east-2:146868985163:cli_topic"
}
```

**Get Topics**
```
ubuntu@adgu:~$ aws sns list-topics
{
    "Topics": [
        {
            "TopicArn": "arn:aws:sns:us-east-2:146868985163:cli_topic"
        } 
    ]
}

```

**Create Subscriber**
```
ubuntu@adgu:~$ aws sns subscribe --topic-arn arn:aws:sns:us-east-2:146868985163:cli_topic --protocol email --notification-endpoint nick@awsdev.guru
{
    "SubscriptionArn": "pending confirmation"
}
```

**Publish to Topic**
```
ubuntu@adgu:~/awsdevassoc/13._SNS$ aws sns publish --topic-arn "arn:aws:sns:us-east-2:146868985163:cli_topic" --message "hello there"
{
      "MessageId": "eb49225e-dfd6-5731-9951-71b7fdbf2c03"
}

```

**List Subscriptions**
```
ubuntu@adgu:~/awsdevassoc$ aws sns list-subscriptions
{
    "Subscriptions": [
        {
            "Owner": "146868985163", 
            "Endpoint": "nick@awsdev.guru", 
            "Protocol": "email", 
            "TopicArn": "arn:aws:sns:us-east-2:146868985163:cli_topic", 
            "SubscriptionArn": "arn:aws:sns:us-east-2:146868985163:cli_topic:eca19935-368c-435b-8fa7-bc3c957daf65"
        }
    ]
}
```

**Set subscription filter policy**
```
ubuntu@adgu:~$ aws sns set-subscription-attributes --subscription-arn "arn:aws:sns:us-east-2:146868985163:cli_topic:eca19935-368c-435b-8fa7-bc3c957daf65" --attribute-name FilterPolicy --attribute-value '{"teamInterests":["giants", "mets"]}'
```

**Publish to Topic with Attributes**
```
aws sns publish --topic-arn arn:aws:sns:us-east-2:146868985163:cli_topic --message "The braves won the world series." --message-attributes '{"teamInterest":{"DataType":"String","StringValue":"braves"}}'
```

