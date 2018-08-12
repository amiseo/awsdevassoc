# User Data

The following is added as user data when launching an Amazon Linux EC2 instance:  
```
#!/bin/bash
yum -y install httpd php
chkconfig httpd on
systemctl start httpd

cd /var/www/html
wget https://bitbucket.org/awsdevguru/awsdevassoc/raw/549b54852cf3b5a8fae60dc55e0f3facb19ff2a8/07._EC2/UserData/index.php
```
