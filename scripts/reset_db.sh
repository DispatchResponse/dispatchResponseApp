#!/bin/bash

HOST='stn4.homelinux.com'
# HOST='pca.homelinux.com'

###### Be extremely careful using this next line.
###### It will erase the entire main database.
# HOST='ersdispatch.cguymocs6upp.us-east-1.rds.amazonaws.com'

if [ -f "$HOME/.pgpass" ]; then
  printf "%s\n " "$(chmod 0600 $HOME/.pgpass)"
  echo "Resetting the database at $HOST"

  echo " $( psql -h $HOST -p 5432 -U webapplogin  gfddispatch  -f ./scripts/postgresql_gfd_db_create.sql) "

  printf "\n%s\n\n" " 😎  Success at resetting the database at $HOST"

else

   echo "You need a .pgpass file in your home directory with proper DB
   credentials 😎 "
fi
