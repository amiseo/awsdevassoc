# AWS Developer Associate - Route53
The Route53 service provides hosted DNS services.

## CLI Command Examples Discussed
**List Hosted Zones**
```
ubuntu@adgu:~$ aws route53 list-hosted-zones
{
    "HostedZones": [
        {
            "ResourceRecordSetCount": 6, 
            "CallerReference": "EE915DD1-AA91-1430-AD16-FD7854CB2B43", 
            "Config": {
                "PrivateZone": false
            }, 
            "Id": "/hostedzone/Z3F6SGUWHWTW5", 
            "Name": "xxxxx.us."
        }, 
        {
            "ResourceRecordSetCount": 2, 
            "CallerReference": "2E9F35DE-40E4-D34C-B915-CC48AC293D04", 
            "Config": {
                "Comment": "testzone", 
                "PrivateZone": false
            }, 
            "Id": "/hostedzone/Z1VQVU90MCS7A", 
            "Name": "xxxxxx.com."
        }, 
        {
            "ResourceRecordSetCount": 2, 
            "CallerReference": "12346578", 
            "Config": {
                "PrivateZone": false
            }, 
            "Id": "/hostedzone/Z2WZEL09R1V5O", 
            "Name": "xxxxxxx.com."
        }
    ]
}

```

**Create Hosted Zone**
```
ubuntu@adgu:~$ aws route53 create-hosted-zone --name asdf2.com --caller-reference 12346578
{
    "HostedZone": {
        "ResourceRecordSetCount": 2, 
        "CallerReference": "12346578", 
        "Config": {
            "PrivateZone": false
        }, 
        "Id": "/hostedzone/Z2WZEL09R1V5OQ", 
        "Name": "asdf2.com."
    }, 
    "DelegationSet": {
        "NameServers": [
            "ns-81.awsdns-10.com", 
            "ns-1621.awsdns-10.co.uk", 
            "ns-697.awsdns-23.net", 
            "ns-1398.awsdns-46.org"
        ]
    }, 
    "Location": "https://route53.amazonaws.com/2013-04-01/hostedzone/Z2WZEL09R1V5OQ", 
    "ChangeInfo": {
        "Status": "PENDING", 
        "SubmittedAt": "2018-07-23T20:43:35.784Z", 
        "Id": "/change/C2LRC3QCM7DSZX"
    }
}

```

**Delete Hosted Zone**
```
ubuntu@adgu:~$ aws route53 delete-hosted-zone --id "/hostedzone/Z2WZEL09R1V5OQ"
```

**List Records**
```
ubuntu@adgu:~$ aws route53 list-resource-record-sets --hosted-zone-id "/hostedzone/Z1VQVU90MCS7AK"
{
    "ResourceRecordSets": [
        {
            "ResourceRecords": [
                {
                    "Value": "ns-1609.awsdns-09.co.uk."
                }, 
                {
                    "Value": "ns-1329.awsdns-38.org."
                }, 
                {
                    "Value": "ns-58.awsdns-07.com."
                }, 
                {
                    "Value": "ns-777.awsdns-33.net."
                }
            ], 
            "Type": "NS", 
            "Name": "asdf.com.", 
            "TTL": 172800
        }, 
        {
            "ResourceRecords": [
                {
                    "Value": "ns-1609.awsdns-09.co.uk. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"
                }
            ], 
            "Type": "SOA", 
            "Name": "asdf.com.", 
            "TTL": 900
        }
    ]
}
```

