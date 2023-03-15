#!/bin/bash
docker exec -it backend sh
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all