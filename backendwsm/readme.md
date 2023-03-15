docker exec -it web sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all