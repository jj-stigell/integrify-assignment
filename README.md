# Todo app backend API

## Table of Contents

- [Introduction](#introduction)
- [Built with](#built-with)
- [Running the program](#running-the-program)
- [Endpoints](#endpoints)
- [Migrations](#migrations)

## Introduction

Backend for a todo application that requires users to be logged in before they can call the APIs.
One user can create multiple todo items and one todo item can only belong to a single user.

## Built with

- [Express](https://expressjs.com/) with [typescript](https://www.typescriptlang.org/) and [Node.js](https://nodejs.org/en/)
- Database [PostgreSQL](https://www.postgresql.org/) using [pg client](https://www.npmjs.com/package/pg) and [Sequelize](https://sequelize.org/) ORM
- Password hashing with [bcrypt](https://www.npmjs.com/package/bcrypt)
- Authorization with [JSON web tokens](https://www.npmjs.com/package/jsonwebtoken)

## Running the program

Install the necessary Node.js modules at the project root:
```
$ npm install
```

Create .env file to the project root and add database credentials and other variables to it:
```
POSTGRES_USER=dbUserNameString
POSTGRES_PASSWORD=dbPasswordString
POSTGRES_DATABASE=dbNameString
POSTGRES_HOST_URL=dbHostUrl
JWTSECRET=your-256-bit-secret
BACKEND_PORT=postnumber
```

Transpile the typescript to javascript:
```
$ npm run build
```

Start the program (if first time, remember to run [migrations](#migrations) first):
```
$ npm run start
```

Start the program in development mode. Everytime file is changed, the program is recompiled and restarted:
```
$ npm run dev
```

## Endpoints

Available endpoints:

- **POST** */api/v1/signup*: Sign up as an user of the system, using email & password.
- **POST** */api/v1/signin*: Sign in using email & password. The system will return the JWT token that can be used to call the APIs that follow.
- **PUT** */api/v1/changePassword*: Change user’s password. **Access requires valid JWT**
- **GET** */api/v1/todos?status=[status]*: Get a list of todo items. Optionally, a status query param can be included to return only items of specific status. If not present, return all items. **Access requires valid JWT**
- **POST** */api/v1/todos*: Create a new todo item. **Access requires valid JWT**
- **PUT** */api/v1/todos/:id*: Update a todo item. **Access requires valid JWT**
- **DELETE** */api/v1/todos/:id*: Delete a todo item. **Access requires valid JWT**

## Migrations

Migrations to keep track of changes to the database. With migrations
you can transfer existing database into another state and vice versa.
Those state transitions are saved in migration files, which describe
how to get to the new state and how to revert the changes in order
to get back to the old state.

Migration files are placed in the folder `/src/database/migrations`.
Migration files are named with ascending numbering and name describing
the actions migration does to the database state. For an example:
```
001-initial-migration.ts
002-add-indexes.ts
```

Migrations utilize the Sequelize [Command Line Interface](https://github.com/sequelize/cli).
The database which CLI will connect is defined in `/src/configs/database.ts`,
more information on options [here](https://github.com/sequelize/cli/blob/main/docs/README.md).
Detailed information about migrations in the Sequelize
[documentation](https://sequelize.org/docs/v6/other-topics/migrations/).

Migration, config, and model paths are defined in `.sequelizerc`.

Run database migrations all the way to latest one:
```
$ npm run migration:up
```

Run one migration down:
```
$ npm run migration:down
```
