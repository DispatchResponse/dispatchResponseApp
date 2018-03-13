#!/bin/bash

cd /home/ubuntu
chown -R ubuntu:ubuntu ./gfddispatch

if [[ -d /home/ubuntu/gfddispatch/credentials ]]; then
   rm -rf /home/ubuntu/gfddispatch/credentials
fi

exit 0
