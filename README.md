# Storefront Backend Project

## Getting Started

- clone this repo
- setup a Postgres SQL database localy or using docker
- run: "npm run install" to install all the dependencies
```
npm run install
```  
- create a .env file in the root of the project and fill it accordingly

```
POSTGRES_HOST= database server address
POSTGRES_DB= database name
POSTGRES_TEST_DB= test database name
POSTGRES_USER= database user, for dev and test
POSTGRES_PASSWORD= password
ENV=dev
BCRYPT_PASSWORD= bcrypt password
SALT_ROUNDS=10
TOKEN_SECRET= token
```

### 1. Setting up Postgres using docker

You need to install the docker using the docker-compose.yml file provided in the repo. Note that you may need to update this file to fit your computer in order to use it locally.
update the environment variables "POSTGRES_PASSWORD" with your desired password:
```
environment:
      POSTGRES_PASSWORD: yourpassword
```
please note that this docker-compose file also contain adminer, WebUI to manage the database

after the database is set you need to create 2 database, one for dev and one for test and update those in the .env file

### 2.  DB Creation and Migrations

the first script to run is the DB Migration script for creating the Database Tables
but before running the migration update database.json file with your database information

```
npm run dbsetup
```

### 3. Project Scripts 

bulding the project and runnig it 
```
npm run start
```

dev mode: watch typescript changes when developing
```
npm run watch
```

running all the tests
```
npm run test
```

building the project, if you wold like to only build it
```
npm run build
```

check for code errors
```
npm run lint
```

making the code prettier
```
npm run prettier
```

reset all the database and remove all the tables
```
npm run dbreset
```
