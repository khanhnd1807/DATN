#! /bin/bash

cd /home/ubuntu/projectwsm

sudo docker pull khanhnd1807/wsm:backend
sudo docker pull khanhnd1807/wsm:frontend
sudo docker images

sudo docker-compose -f ./docker-compose.prod.yml up -d

