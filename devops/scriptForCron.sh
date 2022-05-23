#!/bin/bash

cd /home/checklist/$1/shared-checklist/devops

changed=`git fetch && git status | grep behind`
if [[ ! -z "$changed" || ! -z "$START_WITHOUT_PULL" ]]
then
    NGINX_PORT=$2 STAGE=$1 bash refetchStartScript.sh
    if [ $? -eq 0 ]; then
        echo "OK :))"
    else
        echo "FAIL :("
    fi
fi
