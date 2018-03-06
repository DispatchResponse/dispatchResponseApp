#!/bin/bash

isExistApp=`pgrep nginx`
if [[ -n  $isExistApp ]]; then
   killall nginx
fi

isExistApp=`pgrep node`
if [[ -n  $isExistApp ]]; then
   killall node
fi

exit 0
