# Todo app backend API

## Table of Contents

- [Introduction](#introduction)
- [Built with](#built-with)
- [Running the program](#running-the-program)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Migrations](#migrations)
- [Missing features](#missing-features)

## Introduction

Backend for a todo application that requires users to be logged in before they can call the APIs.
One user can create multiple todo items and one todo item can only belong to a single user.

Demo API running at https://todo-api-8qng.onrender.com/

## Built with

- [Express](https://expressjs.com/) with [typescript](https://www.typescriptlang.org/) and [Node.js](https://nodejs.org/en/) [v16.15.1](https://nodejs.org/tr/blog/release/v16.15.1/)
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

## Authentication

API uses [bearer](https://datatracker.ietf.org/doc/html/rfc6750) tokens for authentication.

Add the authorization header for endpoints that require authentication.
```
Authorization: Bearer <JWT_token>
```

## Endpoints

<br>
<details>
<summary>Create a new user</summary>
<br>

Sign up as an user of the API, using email & password.

**URL** : `/api/v1/signup`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : -

**Data example** :
```json
{
    "email": "myemail@email.com",
    "password": "foobar123"
}
```

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** :
```json
{
    "success": "new user created succesfully"
}
```

### Error Response

**Condition** : Email and/or password not send with the request.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "email or password missing"
}
```

### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>


<details>
<summary>Sign in</summary>
<br>

Sign in using email & password.
The API will return the JWT token that can be used to call the APIs that follow.

**URL** : `/api/v1/signin`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : -

**Data example** :
```json
{
    "email": "myemail@email.com",
    "password": "foobar123"
}
```

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** :
```json
{
    "success": "new user created succesfully"
}
```

### Error Response

**Condition** : Email and/or password not send with the request.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "email or password missing"
}
```

### Or

**Condition** : Email not found.

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "error": "user with an email address {email} not found"
}
```

### Or

**Condition** : Password incorrect.

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
    "error": "password incorrect"
}
```
### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>


<details>
<summary>Change password</summary>
<br>

Change user’s password.

**URL** : `/api/v1/changePassword`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : -

**Data example** :
```json
{
    "password": "foobar123",
    "newPassword": "123foobar"
}
```

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** :
```json
{
    "success": "password changed succesfully"
}
```

### Error Response

**Condition** : Current password and/or new password not send with the request.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "current password or new password missing"
}
```

### Or

**Condition** : Current password and new password are equal.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "new password cannot be same as current password"
}
```

### Or

**Condition** : User with an id not found.

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "error": "user with an id {userId} not found"
}
```

### Or

**Condition** : Current password incorrect.

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
    "error": "current password incorrect"
}
```

### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>


<details>
<summary>Get todos</summary>
<br>

Get a list of todo items.

**URL** : `/api/v1/todos?status=[status]`

**URL Query parameters** : status=[string] status query param can be included to return only items of specific status. If not present, return all items.

**Method** : `GET`

**Auth required** : YES

**Permissions required** : -

**Data example** : -

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** :
```json
[
    {
        "id": 1,
        "name": "name of the todo 1",
        "description": "description for this todo",
        "status": "NOTSTARTED",
        "createdAt": "2022-12-29T12:28:39.892Z",
        "updatedAt": "2022-12-29T12:28:39.892Z",
        "userId": 1
    },
    {
        "id": 2,
        "name": "name of the todo 2",
        "description": "description for this todo",
        "status": "COMPLETED",
        "createdAt": "2022-12-29T12:29:32.767Z",
        "updatedAt": "2022-12-29T12:29:32.767Z",
        "userId": 2
    },
    {
        "id": 3,
        "name": "name of the todo 3",
        "description": "description for this todo",
        "status": "ONGOING",
        "createdAt": "2022-12-29T12:29:35.857Z",
        "updatedAt": "2022-12-29T12:29:35.857Z",
        "userId": 3
    }
]
```

### Error Response

**Condition** : Status is in the query params but is not one of the available status values: NOTSTARTED, ONGOING, or COMPLETED

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "incorrect status value, must be one of 'NOTSTARTED', 'ONGOING', 'COMPLETED'"
}
```

### Or

**Condition** : No todos found.

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "error": "no todos found"
}
```

### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>


<details>
<summary>Create todo</summary>
<br>

Create a new todo item. Name and status must be send with the request. Description is optional.
Status must be one of following: NOTSTARTED, ONGOING, or COMPLETED.

**URL** : `/api/v1/todos`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : -

**Data example** :
```json
{
    "name": "name of the todo 1",
    "description": "description for this todo",
    "status": "NOTSTARTED",
}

```

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** :
```json
{
    "id": 1,
    "name": "name of the todo 1",
    "description": "description for this todo",
    "status": "NOTSTARTED",
    "createdAt": "2022-12-29T12:28:39.892Z",
    "updatedAt": "2022-12-29T12:28:39.892Z",
    "userId": 1
}
```

### Error Response

**Condition** : Name and/or status not send with the request.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "name or status missing"
}
```

### Or

**Condition** : Status is sent but is not one of the available status values: NOTSTARTED, ONGOING, or COMPLETED

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "incorrect status value, must be one of 'NOTSTARTED', 'ONGOING', 'COMPLETED'"
}
```

### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>


<details>
<summary>Update todo</summary>
<br>

Update a todo item.
Status must be one of following: NOTSTARTED, ONGOING, or COMPLETED.
Name, description, and status are optional.

**URL** : `/api/v1/todos/:id`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : Must be the owner of the todo.

**Data example** :
```json
{
    "name": "update this todo",
    "description": "description for this todo that is being updated",
    "status": "COMPLETED",
}

```

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** :
```json
{
    "id": 1,
    "name": "update this todo",
    "description": "description for this todo that is being updated",
    "status": "COMPLETED",
    "createdAt": "2022-12-29T12:28:39.892Z",
    "updatedAt": "2022-12-30T12:28:39.892Z",
    "userId": 1
}
```

### Error Response

**Condition** : Status is sent but is not one of the available status values: NOTSTARTED, ONGOING, or COMPLETED

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "incorrect status value, must be one of 'NOTSTARTED', 'ONGOING', 'COMPLETED'"
}
```

### Or

**Condition** : Todo with an id not found.

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "error": "todo with an id {id} not found"
}
```

### Or

**Condition** : User is not the owner of the todo.

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
    "error": "you are not the owner of todo id {id}"
}
```

### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>


<details>
<summary>Delete todo</summary>
<br>

Delete a todo item.

**URL** : `/api/v1/todos/:id`

**URL Parameters** : id=[integer] where id is the ID of the todo on the server.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : Must be the owner of the todo.

**Data example** : -

### Success Responses

**Condition** : -

**Code** : `200 OK`

**Content example** : -

### Error Response

**Condition** : Todo id missing.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
    "error": "todo id missing"
}
```

### Or

**Condition** : Todo with an id not found.

**Code** : `404 NOT FOUND`

**Content** :
```json
{
    "error": "todo with an id {id} not found"
}
```

### Or

**Condition** : User is not the owner of the todo.

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
    "error": "you are not the owner of todo id {id}"
}
```

### Or

**Condition** : Unexpected error occurs during database call or hashing. Message can vary depending on the error.

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "error": "message"
}
```

<br>
</details>
<br>

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

## Missing features

- tests
- input validation
- check if email already taken
