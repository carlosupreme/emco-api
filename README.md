# EMCO

This is the REST-API for EMCO (Equipo Multidisciplinario Competitivo de Oaxaca)

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

This document describes the resources that make up the official EMCO REST-API

If you have any problems or requests, please contact our API team.

## API Endpoints

### Authentication

#### Register

- Method: `POST`
- Path: `/register`
- Description: Register a user with all required information

- Request Body:
```json
{
  "username": "developer1",
  "password": "GreatPassword_0000",
  "fullname": "Emco Developer 1",
  "email": "developer@emco.com",
  "phone": "9876543210",
  "photo": "https://ui-avatars.com/api/?name=Emco+Developer",
  "socialMedia": {
    "instagram": "emco"
  },
  "schoolId": "123456789",
  "major": "Computer Science",
  "semester": 5
}
```
- Response:
```js
200 OK
```
```json
{
  "message": "You have been successfully registered. Please log in",
  "user": {
    "user": {
      "id": "6ca3b7d7-4315-4865-953b-118c83a134bc",
      "username": "developer1",
      "password": "$2b$10$8tKo04cRR9...pH7q"
    },
    "profile": {
      "id": "3dc4331a-2b23-4c78-aaca-39c86d618216",
      "userId": "6ca3b7d7-4315-4865-953b-118c83a134bc",
      "fullname": "Emco Developer 1",
      "email": "developer@emco.com",
      "phone": "9876543210",
      "photo": "https://ui-avatars.com/api/?name=Emco+Developer",
      "socialMedia": {
        "instagram": "emco"
      },
      "registeredAt": "2023-12-27T02:40:54.214Z"
    },
    "schoolData": {
      "id": "123456789",
      "major": "Computer Science",
      "semester": 5
    }
  }
}

```

#### Login

- Method: `POST`
- Path: `/login`
- Description: This endpoint is for authenticating the user, it receives the username and password in plain text. 
If the credentials are correct the access token is answered, otherwise the error is answered".

- Request Body:
```json
{
    "username": "developer1",
    "password": "GreatPassword_0000"        
}
```
- Response:
```js
200 OK
```
```json
{
  "message": "Logged in successfully",
  "user": {
    "id": "6ca3b7d7-4315-4865-953b-118c83a134bc",
    "username": "developer1",
    "password": "$2b$10$8tKo04cRR9...pH7q"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...mOc"
}
```



## Error Handling

Errors are shown with the standard [Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
> This document defines a "problem detail" as a way to carry machine-readable details of errors in a HTTP response to avoid the need to define new error response formats for HTTP APIs

### Example of an error

If we hit the `/register` endpoint with data that already exists in the database we get an error like the following one
```json
{
  "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
  "status": 400,
  "title": "Bad Request",
  "detail": "The registration data already exists in our records. Try another values.",
  "errors": [
    {
      "code": "Register.UserAlreadyExists",
      "description": "User already exists",
      "type": "conflict"
    },
    {
      "code": "Register.EmailAlreadyExists",
      "description": "Email already exists",
      "type": "conflict"
    },
    {
      "code": "Register.PhoneAlreadyExists",
      "description": "Phone already exists",
      "type": "conflict"
    },
    {
      "code": "Register.SchoolIdAlreadyExists",
      "description": "School ID already exists",
      "type": "conflict"
    }
  ]
}
```

## Contributing

If you have any questions, comments, or suggestions, please open an issue or create a pull request 🙂

## License

This project is licensed under the terms of the MIT license.