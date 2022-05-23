#!/bin/sh
echo "---------------- Recompile App in Docker Container ---------------------"

echo "\n>>> install global environment"
npm install --global npm@6 && echo n | npm install -g --silent @angular/cli

echo "\n>>> build front module"
cd /var/app/front && npm install && ng build --base-href /

echo "\n>>> install BACKEND (API) module"
cd /var/app/back && npm install
