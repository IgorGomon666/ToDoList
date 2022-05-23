#!/bin/bash
echo "\n---------------- docker-compose down ---------------------"
NGINX_PORT=$NGINX_PORT COMPOSE_PROJECT_NAME=$STAGE docker-compose down

echo "\n---------------- remove front dists -------------------"
rm -rf ../front/dist/shared-checklist

echo "\n---------------- re-compile front ---------------------"
docker rm -f npm_compiler
docker run -v ${PWD%/*}:/var/app --name npm_compiler node:16 sh -c "cd /var/app/devops && sh reCompileInDockerContainer.sh"
docker rm -f npm_compiler

echo "\n---------------- delete db ----------------------"
# rm -rf ../database/*
#1000:1000 jeto id-shki mrprototype user, sluchajno poluchilis' takie kruglye cifry ;)
#docker run --user 1000:1000 -it -d -v `pwd`/../database:/data/db -v `pwd`:/var/app --name mrprototype_mongo_import mongo
#sleep 5s
#docker exec -it mrprototype_mongo_import sh -c "cd /var/app && mongorestore -d mergerequest ./mergerequest"
#docker rm -f mrprototype_mongo_import

echo "\n---------------- docker-compose up ---------------------"
NGINX_PORT=$NGINX_PORT COMPOSE_PROJECT_NAME=$STAGE docker-compose up -d

#echo "\n---------------- import db ----------------------"
#sleep 15s
#docker exec prototype_database_1 sh -c "mongorestore -d mergerequest /mergerequest"

GIT_MESSAGE=$(git log -1 --pretty=%B)

if [ $? -eq 0 ]; then
    echo '>>> OK - send telegram notification'
    curl -X POST -H "Content-Type: application/json" -d "{\"chat_id\": \"-609663802\", \"text\": \"CI-${STAGE}: Ура! что-то новенькое: $GIT_MESSAGE, see: https://dev.checklist.in-entwurf.de/\"}" https://api.telegram.org/bot1209786199:AAGMHf1GiwwgrYy6QvwJJQh1UNja4lgO3HY/sendMessage
else
    echo '>>> FAIL Tel to Jungs <<<'
    curl -X POST -H "Content-Type: application/json" -d "{\"chat_id\": \"-609663802\", \"text\": \"CI-${STAGE}: Update не прошёл, на сервере беспорядки! Позовите АДМИНА!!!\"}" https://api.telegram.org/bot1209786199:AAGMHf1GiwwgrYy6QvwJJQh1UNja4lgO3HY/sendMessage
fi
