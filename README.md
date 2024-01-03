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
- Path: `/auth/register`
- Description: Register a user with basic information.

`username`:

- Required
- 3-20 characters

`password`:

- Required
- At least 8 characters
- At least 1 letter uppercase, lowercase, digit and a special char

##### Register examples

```json
{
  "username": "",
  "password": "123"
}
```

Response:

```json
// 400 Bad Request ⚠️
{
  "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
  "status": 400,
  "title": "Bad Request",
  "detail": "There is an error in your request.",
  "errors": {
    "username": "Username is required",
    "password": "Password must be at least 8 characters"
  }
}
```

✅ Good Request:

```json
{
  "username": "username",
  "password": "Valid-password123"
}
```

Response:

```json
// 200 OK 🆗
{
  "message": "You have been successfully registered.",
  "username": "username",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....2hPjqHbvsNXq5SMVw"
}
```

#### Login

- Method: `POST`
- Path: `/auth/login`
- Description: This endpoint is for authenticating the user, it receives the username and password in plain text.
  If the credentials are correct the access token is answered, otherwise the error is answered".

`username`: Required

`password`: Required

✅ Good Request:

```json
{
  "username": "developer1",
  "password": "GreatPassword_0000"
}
```

Response:

```json
// 200 OK 🆗
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

In case of the given credentials do not match our records:

```json
{
  "username": "user",
  "password": "does not exists"
}
```

Response:

```json
// 400 Bad Request ⚠️
{
  "type": "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
  "status": 400,
  "title": "Bad Request",
  "detail": "There is an error in your request.",
  "errors": {
    "InvalidCredentials": "Invalid username or password"
  }
}
```

## Error Handling

Errors are shown with the standard [Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)

> This document defines a "problem detail" as a way to carry machine-readable details of errors in a HTTP response to avoid the need to define new error response formats for HTTP APIs

## Contributing

If you have any questions, comments, or suggestions, please open an issue or create a pull request 🙂

## License

This project is licensed under the terms of the MIT license.
