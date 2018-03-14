#!/bin/bash

chown -R ubuntu:ubuntu /home/ubuntu/gfddispatch

if [[ -d /home/ubuntu/gfddispatch/credentials ]]; then
   rm -rf /home/ubuntu/gfddispatch/credentials
fi

exit 0
