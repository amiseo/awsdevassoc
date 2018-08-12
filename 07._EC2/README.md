# AWS Developer Associate - EC2

The EC2 service provides the ability to launch compute instances in AWS.

## CLI Command Examples Discussed
**Show all images owned by Amazon**
```
aws ec2 describe-images --owners amazon --query 'Images[*].[ImageId,Name]' --output text
```

**Show all images owned by 'self' (this account id)**
```
aws ec2 describe-images --owners self --query 'Images[*].[ImageId,Name]' --output text
```

**Create an AMI from one of our instances**
```
# Get instance-id of the instance we want to create an AMI of
ubuntu@ip-172-31-17-206:~$ aws ec2 describe-instances --output text --query 'Reservations[*].Instances[*].[Placement.AvailabilityZone,Tags[?Key==`Name`].Value | [0], InstanceId, State.Name]'
<...>

# Create AMI from running instance (note, instance will reboot)
ubuntu@ip-172-31-17-206:~$ aws ec2 create-image --instance-id i-0cbf9e991eafb1fc8 --name TestAMI2
{
    "ImageId": "ami-01e2a34d823c08a4e"
}

# View self AMI
ubuntu@ip-172-31-17-206:~$ aws ec2 describe-images --owners self --query 'Images[*].[ImageId,Name]' --output text
ami-01e2a34d823c08a4e	TestAMI2
ami-0953a7a8c67d2f1e4	TestAMI1


```

**Remove an AMI**
```
ubuntu@ip-172-31-17-206:~$ aws ec2 deregister-image --image-id ami-0953a7a8c67d2f1e4
```

**Allocate an EIP**
```
ubuntu@ip-172-31-17-206:~$ aws ec2 allocate-address
{
    "PublicIp": "18.216.76.160", 
    "Domain": "vpc", 
    "AllocationId": "eipalloc-04611e811b42bebfe"
}
```

**List EIPs**
```
ubuntu@ip-172-31-17-206:~$ aws ec2 describe-addresses
{
    "Addresses": [
        {
            "PublicIp": "18.216.76.160", 
            "Domain": "vpc", 
            "AllocationId": "eipalloc-04611e811b42bebfe"
        }, 
        {
            "PublicIp": "18.218.193.225", 
            "Domain": "vpc", 
            "AllocationId": "eipalloc-0ddd89043e3fc4854"
        }
    ]
}

```

**Associate EIP to Instance**
```
ubuntu@ip-172-31-17-206:~$ aws ec2 associate-address --instance-id i-0cbf9e991eafb1fc8 --public-ip 18.218.193.225
{
    "AssociationId": "eipassoc-0770726eaa5f964f9"
}
```

**Release and EIP**
```
ubuntu@ip-172-31-17-206:~$ aws ec2 release-address --allocation-id eipalloc-0ddd89043e3fc4854
```