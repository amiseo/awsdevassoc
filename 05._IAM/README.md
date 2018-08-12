# AWS Developer Associate - IAM

The IAM service provides that means to create user accounts that can be used for either interactive or programmatic access to AWS services.

## CLI Command Examples
**Create User**
```
ubuntu@ip-172-31-17-206:~$ aws iam create-user --user-name Bob  
{  
    "User": {  
        "UserName": "Bob",   
        "Path": "/",   
        "CreateDate": "2018-07-17T04:51:09.889Z",   
        "UserId": "AIDAI25Y5WKWKIIM23EOE",   
        "Arn": "arn:aws:iam::146868985163:user/Bob"  
    }  
}
```    

**Create Password**
```
ubuntu@ip-172-31-17-206:~$ aws iam create-login-profile --user-name Bob --password Password123 --password-reset-required
{
    "LoginProfile": {
        "UserName": "Bob", 
        "CreateDate": "2018-07-17T05:06:08.517Z", 
        "PasswordResetRequired": true
    }
}
```

**Attach Admin Policy**  
Get AdministratorAccess Policy ARN  
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam list-policies --query 'Policies[?contains(PolicyName `AdministratorAccess`) == `true`]|[*].[PolicyName,Arn]' --output text  
AdministratorAccess	arn:aws:iam::aws:policy/AdministratorAccess  
```
Apply Policy to user by ARN  
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam attach-user-policy --user-name Bob --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess"  
```

**Change Password**
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam update-login-profile --user-name Bob --password NewPassword123 --password-reset-required  
```

**Create Access Key**
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam create-access-key --user-name Bob   
{   
    "AccessKey": {   
        "UserName": "Bob",    
        "Status": "Active",    
        "CreateDate": "2018-07-17T06:01:32.689Z",    
        "SecretAccessKey": "<removed>",    
        "AccessKeyId": "<removed>"   
    }   
}   
```

**Create Group**
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam create-group --group-name Administrators   
{   
    "Group": {   
        "Path": "/",    
        "CreateDate": "2018-07-17T06:03:25.310Z",    
        "GroupId": "AGPAJTLI7G4FWMEPKLV6C",    
        "Arn": "arn:aws:iam::146868985163:group/Administrators",    
        "GroupName": "Administrators"   
    }   
}   
```

**Attach Policy to Group**  
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam attach-group-policy --group-name Administrators --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess"  
```

**Add user to Group**  
```
ubuntu@ip-172-31-17-206:~/awsdevassoc$ aws iam add-user-to-group --group-name Administrators --user-name Bob  
```
