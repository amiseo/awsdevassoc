# AWS Developer Associate - CodeDeploy


## CLI Command Examples

**Put Role Policy**
```
ubuntu@adgu:~/awsdevassoc/19._AWS_Developer_Tools/5._CodeDeploy$ aws iam put-role-policy --role-name CodeDeployDemo-EC2-Instance-Profile --policy-name CodeDeployDemo-EC2-Permissions --policy-document file://CodeDeployDemo-EC2-Permissions.json
```

**Create Instance Profile**
```
ubuntu@adgu:~/awsdevassoc/19._AWS_Developer_Tools/5._CodeDeploy$ aws iam create-instance-profile --instance-profile-name CodeDeployDemo-EC2-Instance-Profile

{
    "InstanceProfile": {
        "InstanceProfileId": "AIPAIEXU24D3A5BFYIVT6", 
        "Roles": [], 
        "CreateDate": "2018-08-17T06:30:14Z", 
        "InstanceProfileName": "CodeDeployDemo-EC2-Instance-Profile", 
        "Path": "/", 
        "Arn": "arn:aws:iam::146868985163:instance-profile/CodeDeployDemo-EC2-Instance-Profile"
    }
}
```

**Add Role to Profile**
```
ubuntu@adgu:~/awsdevassoc/19._AWS_Developer_Tools/5._CodeDeploy$ aws iam add-role-to-instance-profile --instance-profile-name CodeDeployDemo-EC2-Instance-Profile --role-name CodeDeployDemo-EC2-Instance-Profile
```

