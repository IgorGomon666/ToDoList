#!/bin/bash
echo "\n---------------- clean and pull new version ---------------------"
git reset --hard
git pull
chmod u+x *.sh

NGINX_PORT=$NGINX_PORT STAGE=$STAGE bash setupOnServer.sh

