#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

echo This script is no longer used in the course.
exit 1

echo Installing Node
cd /tmp
wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz
tar xJf node* -C /opt
echo 'export PATH=$PATH:/opt/node-v8.11.3-linux-x64/bin' >> /etc/bash.bashrc
rm /tmp/node*


echo Installing MongoDB
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
apt-get update
apt-get install -y mongodb-org
service mongod start


printf "\n\n!!! Please run 'source /etc/bash.bashrc' to update your PATH !!!\n\n"

