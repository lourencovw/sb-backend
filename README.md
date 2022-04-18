## Installation

```bash
$ npm install
```

## Running the app

### Option 1 - Locally

```bash
# Step 1 - install dependencies
$ npm install

# Step 2 - copy '.env.example' file with '.env' file name
$ cp .env.example .env 

# Step 3 - create database on MySQL
$ mysql> CREATE DATABASE sb;

# Step 4 - run migrations and seeds
$ npm run migration:run

# Step 5 - run the app on development mode
$ npm run start
```

### Option 1 - As container

```bash
$ docker-compose up
```
