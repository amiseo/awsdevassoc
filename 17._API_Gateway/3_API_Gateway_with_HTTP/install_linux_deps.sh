#!/bin/bash
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

echo Installing Node
cd /tmp
wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz
tar xJf node* -C /opt
echo 'export PATH=$PATH:/opt/node-v8.11.3-linux-x64/bin' >> /etc/bash.bashrc
rm /tmp/node*






echo 'Please run "source /etc/bash.bashrc" to update your PATH'

