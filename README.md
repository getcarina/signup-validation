# Signup Validation

Validates potential new user names for a number of criteria.

This provides a simple API can check whether a given username is available for use in Carina, and mark a username as having been used, to ensure future availability checks remain accurate.

### Installation

```bash
$ docker-compose build
```

```bash
$ docker-compose up
```

The service consists of a Node.js container running [node-restify](https://github.com/restify/node-restify) and a Redis container.

### API

#### `GET /validate/:username`

Returns status code `200` and no output if the provided username is valid.

Returns status code `409` if the provided username is invalid. Also includes JSON output with the reason for the failure.

```json
{
  "status": "error",
  "message": "The provided username already exists."
}
```

#### `POST /signup`

Expects a JSON payload.

```json
{
  "username": "john.q.smith@gmail.com"
}
```

Also does all the same validation as `GET /validate/:username`.

Return status code `202` if the username was valid and successfully saved. This has no external effect other than marking the username as taken within this specific service.

Returns status code `409` if the provided username is invalid. Also includes JSON output with the reason for the failure.

```json
{
  "status": "error",
  "message": "The provided username already exists."
}
```
