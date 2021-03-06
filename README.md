# Typescript React & NodeJS Express Starter

This starter provides production-ready and scalable Javascript fullstack web application boilerplate. Here is an quick overview of services available in the package.

  - Webpack 3.0^ as frontend build tool that enables code splitting, lazy loading and Progressive Web App features
  - React and React-Router 4.0 for Single Page Application
  - Pre-configured CSS library such as Bootstrap and Material-UI in different branches
  - Gulp 4.0^ as build tool that transpiles TypeScript to ES6 Javascript on server side
  - Pre-configured RESTful NodeJS & ExpressJS API with standard JSON response plus Error handling
  - JWT Authentication & User account management services and APIs
  - Socket.io for real-time multiple client broadcasting
  - TypeORM for Database mapping.

# In Progress

  - Server side session management
  - Client side state management using Redux
  - Client side authentication
  - Client side optimisation in Treeshaking
  - Docker configuration


## Installation in MacOS

This starter requires [Node.js](https://nodejs.org/) v8+ to run for native async & await asynchronous tasks.
Please also make sure the latest version of [NPM](https://www.npmjs.com) v6+ is installed.
You can optionally install the package using [Yarn](https://yarnpkg.com/en/)
Note. This app may not be stable in Window.

Install the NPM dependencies and devDependencies. You need to install your SQL database such as MySql and PostgreSQL
```sh
$ npm install or yarn install
$ brew install mysql
```
Edit the .env file to configure environment variables at directory mainly for database.
You may find .env.example for the reference.
```
path/to/react-ts-starter/.env
```

### Build from Source in Development
react-ts-starter uses Webpack to build frontend react app and Gulp to build backend app from Typescript to Javascript.
Open your terminal, navigate to root of diretory that contains package.json file and execute following commands,
```sh
$ npm run server-build
$ npm run client-dev
```
or you may like to constantly build server upon changes
```sh
$ npm run server-build:watch
```

Note that ```npm run client-dev``` uses webpack-dev-server that is good for fast UI building but client may not be able to connect with Service Worker. To test service worker for Progressive Web App capability. Please build frontend in production mode.

### Build from source in Production
```
$ npm run server-build
$ npm run client-build
$ npm start
```

Optionally you can use ```watch``` mode. But you need to open three terminal sessions (tabs) to run the following commands
```sh
$ npm run server-build:watch
$ npm run client-build:watch
$ npm start
```

### 1. Overview

The react-ts-starter's API is the JSON based REST API. All requests are made to endpoints beginning: `http://localhost::port/api`.

All error responses are in this format:
```
{
  "error": {
    "name": "ErrorClassThrown",
    "status": 404,
    "message": "Error message"
  }
}
```

except for error with name `FormValidationError` as it adds `fields` node.

Example:
```
{
  "error": {
    "name": "FormValidationError",
    "status": 400 ,
    "message": "Invalid form input",
    "fields": {
      "email": [
        {
          "rule": "unique",
          "message": "Email 'test@gmail.com' is already taken"
        }
      ],
      "username": [
        {
          "rule": "unique",
          "message": "Username 'testxxx' is already taken"
        }
      ]
    }
  }
}
```

### 2. Authentication

The app uses JWT token for most APIs. you will need a token generated by Login API or Register API and include it as HTTP Authorization header with device ID and device type.

Should be in this format:
```
Authorization: Bearer <token>
```

Example:
```
Authorization: Bearer 181d415f34379af07b2c11d144dfbe35d
```

### 3.  APIs Endpoints

### 3.1. Login

Authenticate user and return the generated token that is used as API key in rest of APIs.
```
POST /api/login
```

Example request:
```
POST /login HTTP/1.1
Host: 127.0.0.1:3001/api
Content-Type: application/json
Accept: application/json

{
  "username": "exampleusername",
  "email": "example@gmail.com"
  "password": "passwordText",
  "userDevice": "web"
}
```

With the following fields:

| Parameter     | Type    | Required? | Description                       |
|---------------|---------|-----------|-----------------------------------|
| `username`    | string  | required  | Username of the user              |
| `username`    | string  | required  | Email of the user                 |
| `password`    | string  | required  | Password of the user              |
| `userDevice`  | string  | required  | Device type of the user. Must be one of the following: android, web, ios |

The response is a Token Object within a data envelope.

Example response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "token": "c76f95235ecf4b1a92e3e544fcef826842e3c7cc"
  }
}
```

Where a Token object is:

| Field       | Type    | Description                                   |
|-------------|---------|-----------------------------------------------|
| token       | string  | Generated token                               |


Possible errors:

| Error code                | Description       |
|---------------------------|-------------------|
| 400 FormValidationError   | The data from the incoming request is not consistent with required format |
| 401 HttpAuthError | The user username, email and passwords may be incorrect |

### 3.2. Register

Create an account.
```
POST /api/register
```

Example request:
```
POST /register HTTP/1.1
Host: api.kachick.com
Content-Type: application/json
Accept: application/json

{
  "username": "exampleusername",
  "email": "example@gmail.com",
  "password": "examplepassword"
}
```

With the following fields:

| Parameter          | Type    | Required? | Description     |
|--------------------|---------|-----------|-----------------|
| `username`         | string  | required  | Username        |
| `email`            | string  | required  | Email address   |
| `password`         | string  | required  | Password        |

The response is a Token object within a data envelope.

Example response:
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
    "user": {
      "username": "test1",
      "email": "testx2@gmail.com",
      "displayName": "test2"
      "id": 23,
      "updatedAt": "2017-07-11T04:27:15.488Z",
      "createdAt": "2017-07-11T04:27:15.488Z",
    }
  }
}
```

Possible errors:

| Error code                | Description       |
|---------------------------|-------------------|
| 400 FormValidationError   | The data from the incoming request is not consistent with required format |

License
----

MIT

