until mysql -u root -h db --password=$MYSQL_ROOT_PASSWORD 2> /dev/null; do
    sleep 1
done

mysql -u root -h db --password=$MYSQL_ROOT_PASSWORD -e \
 "CREATE DATABASE IF NOT EXISTS database_production"
 
npx sequelize-cli  db:migrate
npx sequelize-cli db:seed:all
npm start