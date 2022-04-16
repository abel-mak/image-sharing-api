# image-sharing-api
A node application that allows users to upload and share images

# Built with
- nodejs
- express
- mysql
- sequelize
- json web token
- joi

# Requirements
- docker
- docker-compose

# How to run
- clone the repository
```
git clone https://github.com/abel-mak/image-sharing-api.git
```
- rename .env.example.docker to .env
```
cd server
```
- rename .env.example to .env
- run the app using this command at the root of the project
```
docker-compose up
```
by default the app should run at port 3000

# Example of requests
- signup
```
curl --location --request POST 'localhost:3000/auth/signup' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'firstName=userfs' \
--data-urlencode 'lastName=userln' \
--data-urlencode 'username=username1' \
--data-urlencode 'password=password'
```
- login
```
curl --location --request POST 'localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "username1",
    "password": "password"
}'
```
- upload
```
curl --location --request POST 'localhost:3000/images/new' \
--header 'Authorization: Bearer token \
--form 'image=@/path/to/image'
```




