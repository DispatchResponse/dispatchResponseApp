#!/bin/bash

cd /home/ubuntu
chown -R ubuntu:ubuntu ./ersdispatch

if [[ -d /home/ubuntu/ersdispatch/credentials ]]; then
   rm -rf /home/ubuntu/ersdispatch/credentials
fi

exit 0
