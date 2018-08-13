# AWS Developer Associate - Elastic Beanstalk
AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.  

## CLI Command Examlpes

**Install EB CLI**
```
pip install awsebcli --upgrade --user
```

**eb help**
```
ubuntu@adgu:~$ eb
usage: eb (sub-commands ...) [options ...] {arguments ...}

Welcome to the Elastic Beanstalk Command Line Interface (EB CLI). 
For more information on a specific command, type "eb {cmd} --help".

commands:
  abort        Cancels an environment update or deployment.
  appversion   Listing and managing application versions
  clone        Clones an environment.
  codesource   Configures the code source for the EB CLI to use by default.
  config       Modify an environment's configuration. Use subcommands to manage saved configurations.
  console      Opens the environment in the AWS Elastic Beanstalk Management Console.
  create       Creates a new environment.
  deploy       Deploys your source code to the environment.
  events       Gets recent events.
  health       Shows detailed environment health.
  init         Initializes your directory with the EB CLI. Creates the application.
  labs         Extra experimental commands.
  list         Lists all environments.
  local        Runs commands on your local machine.
  logs         Gets recent logs.
  open         Opens the application URL in a browser.
  platform     Commands for managing platforms.
  printenv     Shows the environment variables.
  restore      Restores a terminated environment.
  scale        Changes the number of running instances.
  setenv       Sets environment variables.
  ssh          Opens the SSH client to connect to an instance.
  status       Gets environment information and status.
  swap         Swaps two environment CNAMEs with each other.
  tags         Allows adding, deleting, updating, and listing of environment tags.
  terminate    Terminates the environment.
  upgrade      Updates the environment to the most recent platform version.
  use          Sets default environment.

optional arguments:
  -h, --help            show this help message and exit
  --debug               toggle debug output
  --quiet               suppress all output
  -v, --verbose         toggle verbose output
  --profile PROFILE     use a specific profile from your credential file
  -r REGION, --region REGION
                        use a specific region
  --no-verify-ssl       do not verify AWS SSL certificates
  --version             show application/version info

To get started type "eb init". Then type "eb create" and "eb open"
```


**Create PHP Environment**
```
ubuntu@adgu:~/awsdevassoc/15._Elastic_Beanstalk$ mkdir phptest
ubuntu@adgu:~/awsdevassoc/15._Elastic_Beanstalk$ cd phptest
ubuntu@adgu:~/awsdevassoc/15._Elastic_Beanstalk/phptest$ eb init --region us-east-2 -p PHP
ubuntu@adgu:~/awsdevassoc/15._Elastic_Beanstalk/phptest$ echo '<?php phpinfo(); ?>' > index.php
ubuntu@adgu:~/awsdevassoc/15._Elastic_Beanstalk/phptest$ eb create phptest-env
Creating application version archive "app-180812_213817".
Uploading phptest/app-180812_213817.zip to S3. This may take a while.
Upload Complete.
Environment details for: phptest-env
  Application name: phptest
  Region: us-east-2
  Deployed Version: app-180812_213817
  Environment ID: e-bghvwqq2zf
  Platform: arn:aws:elasticbeanstalk:us-east-2::platform/PHP 7.1 running on 64bit Amazon Linux/2.7.1
  Tier: WebServer-Standard-1.0
  CNAME: UNKNOWN
  Updated: 2018-08-12 21:38:19.592000+00:00
Printing Status:
2018-08-12 21:38:18    INFO    createEnvironment is starting.
2018-08-12 21:38:19    INFO    Using elasticbeanstalk-us-east-2-146868985163 as Amazon S3 storage bucket for environment data.
2018-08-12 21:38:38    INFO    Created security group named: sg-0d1080a4e5e8e077c
2018-08-12 21:38:38    INFO    Created security group named: awseb-e-bghvwqq2zf-stack-AWSEBSecurityGroup-8T9PTWCG57PU
2018-08-12 21:38:38    INFO    Created load balancer named: awseb-e-b-AWSEBLoa-8DT94RF5Z5E7
2018-08-12 21:38:38    INFO    Created Auto Scaling launch configuration named: awseb-e-bghvwqq2zf-stack-AWSEBAutoScalingLaunchConfiguration-14W58P5PJRE0C
2018-08-12 21:39:40    INFO    Created Auto Scaling group named: awseb-e-bghvwqq2zf-stack-AWSEBAutoScalingGroup-1IMFQEL96JWTD
2018-08-12 21:39:40    INFO    Waiting for EC2 instances to launch. This may take a few minutes.
2018-08-12 21:39:40    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:us-east-2:146868985163:scalingPolicy:4db8e2de-4738-443e-bc30-88dbf15218de:autoScalingGroupName/awseb-e-bghvwqq2zf-stack-AWSEBAutoScalingGroup-1IMFQEL96JWTD:policyName/awseb-e-bghvwqq2zf-stack-AWSEBAutoScalingScaleDownPolicy-7UC3K0EDWQKI
2018-08-12 21:39:40    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:us-east-2:146868985163:scalingPolicy:98793fe2-c7ab-4ef3-8c34-47c8ac7f3a84:autoScalingGroupName/awseb-e-bghvwqq2zf-stack-AWSEBAutoScalingGroup-1IMFQEL96JWTD:policyName/awseb-e-bghvwqq2zf-stack-AWSEBAutoScalingScaleUpPolicy-OS2Y7V5EK5JV
2018-08-12 21:39:41    INFO    Created CloudWatch alarm named: awseb-e-bghvwqq2zf-stack-AWSEBCloudwatchAlarmLow-JUKC3GYG7U58
2018-08-12 21:39:41    INFO    Created CloudWatch alarm named: awseb-e-bghvwqq2zf-stack-AWSEBCloudwatchAlarmHigh-EQ6R094IPEVU
2018-08-12 21:40:53    INFO    Successfully launched environment: phptest-env
```

**Create with DB attached**
```
ubuntu@adgu:~/awsdevassoc/15._Elastic_Beanstalk/dbtest$ eb create dbtest --database --database.engine mysql --database.username dbuser --database.password supersecret
Creating application version archive "app-180812_221540".
Uploading dbtest/app-180812_221540.zip to S3. This may take a while.
Upload Complete.
Environment details for: dbtest
  Application name: dbtest
  Region: us-east-2
  Deployed Version: app-180812_221540
  Environment ID: e-qzqpa4ugg9
  Platform: arn:aws:elasticbeanstalk:us-east-2::platform/PHP 7.1 running on 64bit Amazon Linux/2.7.1
  Tier: WebServer-Standard-1.0
  CNAME: UNKNOWN
  Updated: 2018-08-12 22:15:42.785000+00:00
Printing Status:
2018-08-12 22:15:41    INFO    createEnvironment is starting.
2018-08-12 22:15:42    INFO    Using elasticbeanstalk-us-east-2-146868985163 as Amazon S3 storage bucket for environment data.
2018-08-12 22:16:02    INFO    Created security group named: sg-0e06daa7fdd665365
2018-08-12 22:16:02    INFO    Created security group named: awseb-e-qzqpa4ugg9-stack-AWSEBSecurityGroup-1J3875M1HQCF3
2018-08-12 22:16:02    INFO    Created load balancer named: awseb-e-q-AWSEBLoa-MT5SF3TG74L
2018-08-12 22:16:02    INFO    Created Auto Scaling launch configuration named: awseb-e-qzqpa4ugg9-stack-AWSEBAutoScalingLaunchConfiguration-1BJ0HGUF1XO4F
2018-08-12 22:16:02    INFO    Created security group named: awseb-e-qzqpa4ugg9-stack-AWSEBRDSDBSecurityGroup-6XWWPBHTX7AB
2018-08-12 22:16:03    INFO    Creating RDS database named: aalzy4leuj5wcf. This may take a few minutes.
2018-08-12 22:22:39    INFO    Created RDS database named: aalzy4leuj5wcf
2018-08-12 22:23:41    INFO    Created Auto Scaling group named: awseb-e-qzqpa4ugg9-stack-AWSEBAutoScalingGroup-O45TP8XS15PN
2018-08-12 22:23:41    INFO    Waiting for EC2 instances to launch. This may take a few minutes.
2018-08-12 22:23:41    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:us-east-2:146868985163:scalingPolicy:ca1f2763-b74b-4780-bf2a-9d7b1c38bd27:autoScalingGroupName/awseb-e-qzqpa4ugg9-stack-AWSEBAutoScalingGroup-O45TP8XS15PN:policyName/awseb-e-qzqpa4ugg9-stack-AWSEBAutoScalingScaleUpPolicy-1KHPI3QE3WM4A
2018-08-12 22:23:41    INFO    Created Auto Scaling group policy named: arn:aws:autoscaling:us-east-2:146868985163:scalingPolicy:e7cd0a57-ab4e-4f70-86c3-81248d2ead26:autoScalingGroupName/awseb-e-qzqpa4ugg9-stack-AWSEBAutoScalingGroup-O45TP8XS15PN:policyName/awseb-e-qzqpa4ugg9-stack-AWSEBAutoScalingScaleDownPolicy-NKVY92XHVXRT
2018-08-12 22:23:41    INFO    Created CloudWatch alarm named: awseb-e-qzqpa4ugg9-stack-AWSEBCloudwatchAlarmHigh-1DDNHK4TP4P90
2018-08-12 22:23:41    INFO    Created CloudWatch alarm named: awseb-e-qzqpa4ugg9-stack-AWSEBCloudwatchAlarmLow-1XYZA7XYEH3QQ
2018-08-12 22:24:53    INFO    Successfully launched environment: dbtest
```
