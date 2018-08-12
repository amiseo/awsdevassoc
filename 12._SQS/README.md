# AWS Developer Associate - SQS
The AWS SQS service provides fully managed message queues for microservices, distributed systems, and serverless applications.

## CLI Command Examples
**Help**
```
ubuntu@adgu:~$ aws sqs help
NAME
       sqs -

DESCRIPTION
       Welcome to the Amazon Simple Queue Service API Reference .

       Amazon Simple Queue Service (Amazon SQS) is a reliable, highly-scalable
       hosted queue for storing messages as they travel  between  applications
       or microservices. Amazon SQS moves data between distributed application
       components and helps you decouple these components.
<cut>
```

**Create Queue**
```
ubuntu@adgu:~$ aws sqs create-queue --queue-name testqueue
{
    "QueueUrl": "https://us-east-2.queue.amazonaws.com/146868985163/testqueue"
}
ubuntu@adgu:~$
```

**List Queues**
```
ubuntu@adgu:~$ aws sqs list-queues
{
    "QueueUrls": [
        "https://us-east-2.queue.amazonaws.com/146868985163/testqueue"
    ]
}
ubuntu@adgu:~$ 
```


**Add Message to Queue**
```
ubuntu@adgu:~$ aws sqs send-message --queue-url "https://us-east-2.queue.amazonaws.com/146868985163/testqueue" --message-body '{"id":1234,"message":"test message"}'
{
    "MD5OfMessageBody": "75327d63d1c0d76b8c8c2f479798aa0d", 
    "MessageId": "865ace4a-dd50-4c2b-8dd4-ed5e05396cb1"
}
ubuntu@adgu:~$ 
```

**Visibility Timeout Example**
```
# Retrieve a message
ubuntu@adgu:~$ aws sqs receive-message --queue-url "https://us-east-2.queue.amazonaws.com/146868985163/testqueue"
{
    "Messages": [
        {
            "Body": "{\"id\":1234,\"message\":\"test message\"}", 
            "ReceiptHandle": "AQEBGvHdMPUZUoD6OaJrhColnC5fYv54UbqYmHtB5Y6VqEmGHyRT8GZSifS/lvMEDcYnGUTNZNxSMBaGMWfIGlyc6rEnDQyr39ppf5S1JLtdbgL0pXixFifl3GnJI6JE7KN2mvgJfbJ7B5d4VaVNBSZGoOWPXcJp9sbXawht3keOSQUkSk2gYCZQHADTrwBDlXLy7KmK5ek8zygn8GClCl1QHDn+xdF20LmwS6DC3vh5ibrlPs3CqlfLSyLwG0pKegG/jIGwqEy5UCVM/KdWr25ZRUcUZt0IEHZF/PYTNpiaS0cw4G1OlvVR21Y06LqHiVkXvZ1uQxlLbrJOkPfRme99tNkBfiXqr31KBUN1Wb4iL6K7NArvAw75pzcmpQVrZ/wlvARqUUxQd/Bn8EgdTd3wmQ==", 
            "MD5OfBody": "75327d63d1c0d76b8c8c2f479798aa0d", 
            "MessageId": "865ace4a-dd50-4c2b-8dd4-ed5e05396cb1"
        }
    ]
}

# Immediately retrieve a message again
ubuntu@adgu:~$ aws sqs receive-message --queue-url "https://us-east-2.queue.amazonaws.com/146868985163/testqueue"
# No messages available

# Wait for visibility time, retrieve a message
ubuntu@adgu:~$ sleep 30; aws sqs receive-message --queue-url "https://us-east-2.queue.amazonaws.com/146868985163/testqueue"
{
    "Messages": [
        {
            "Body": "{\"id\":1234,\"message\":\"test message\"}", 
            "ReceiptHandle": "AQEBJI+vMrRfb9+YYU2qu0Bi2H0OI6oqNRjDWEU9WsS0OsQn/Lw8ESeW+TDamSm6eN7ilXQFl8vSOIPk1CHtikeX9KKdaB/ohI7YxBOgvkswQs8wQQ8vQMRaiCSPy9Zm6hi9r2xMJE0BiHy8dLHme7HuwRBqrlHk3ilTyIldxLRyPyVwD19/evC0qTTdkk2zZ9muqZnwcKQ7p5Egy0X0GNoGphj6OmUjJs5Oh8KlzxqKPwVeVS6pvMvP86el8oA+//vj8nLZiDgVMuV0xQePT6dtlBKWCwD6eSQh+/iAZsp2ExN8K1Bnb1vW7ujGuJplX3cX8pMB0T3xbq5yriZeAM6EnB4qJmHFGec8GSMLqLh1AeJPmmYn58V6m/qxgbtuzf/f793QVlqE5xl3vytqfIz9+Q==", 
            "MD5OfBody": "75327d63d1c0d76b8c8c2f479798aa0d", 
            "MessageId": "865ace4a-dd50-4c2b-8dd4-ed5e05396cb1"
        }
    ]
}
# Same message retrieved.
```

**Create a queue with non-default attributes**
```
ubuntu@adgu:~$ aws sqs create-queue --queue-name testqueue2 --attributes '{"VisibilityTimeout":"120"}'
{
    "QueueUrl": "https://us-east-2.queue.amazonaws.com/146868985163/testqueue2"
}
ubuntu@adgu:~$ 
```
