#!/bin/bash

cd /home/ubuntu/ersdispatch
npm install
npm run build
chown -R ubuntu:ubuntu /home/ubuntu/ersdispatch/public
npm start > /dev/null 2> /dev/null < /dev/null &
#systemctl start nodeserver.service > /dev/null 2> /dev/null < /dev/null &

# before using systemctl, go to the nodeserver.service file on the server and
# change User and Group to ubuntu, but must make sure that /public is
# completely owned by ubuntu
