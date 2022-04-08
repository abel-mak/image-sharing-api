until mysql -u root -h db --password=$MYSQL_ROOT_PASSWORD; do
    sleep 1
done

mysql -u root -h db --password=$MYSQL_ROOT_PASSWORD -e \
 "CREATE DATABASE IF NOT EXISTS database_development"
 
./node_modules/.bin/sequelize-cli  db:migrate
./node_modules/.bin/nodemon -L --inspect=0.0.0.0 app.js
