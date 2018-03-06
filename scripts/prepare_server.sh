#!/bin/bash

# Remove all files in ersdispatch so we can cleanly inject new files from S3
# Note this particular rm invocation gets dot files as well
cd /home/ubuntu/ersdispatch
rm -rf * .[^.]*
# Install and/or upgrade nginx
apt-get -y install nginx

# Replace the default nginx website config with a proxy to our node app
# Get this file from S3
rm -f /etc/nginx/sites-available/default
aws s3 cp s3://ers-dispatch/scripts/nginx-server.conf /etc/nginx/sites-available/default

# Get the firebase key from S3 and inject it into the key directory
aws s3 cp s3://ers-dispatch/scripts/ers-dispatch-firebase-adminsdk-08k8q-3c9e3d13f9.json /home/ubuntu/ersdispatch/key/ers-dispatch-firebase-adminsdk-08k8q-3c9e3d13f9.json

# Get environment variables and inject into .env
aws s3 cp s3://ers-dispatch/scripts/environment-vars.txt /home/ubuntu/ersdispatch/.env

# Get AWS credentials
aws s3 cp s3://ers-dispatch/scripts/aws-credentials.json /home/ubuntu/ersdispatch/.aws-credentials.json

# Get tmux.conf and bash_aliases because they are useful
aws s3 cp s3://ers-dispatch/scripts/tmux.conf /home/ubuntu/.tmux.conf
aws s3 cp s3://ers-dispatch/scripts/bash_aliases /home/ubuntu/.bash_aliases

service nginx restart

# This creates a default home page although nginx redirects it away to our node app
echo 'hello world' > /var/www/html/index.html
hostname >> /var/www/html/index.html

# This updates node to version 8
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get -y install nodejs

exit 0
