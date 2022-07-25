Blog api

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Api

```bash
# user login
/auth/login
method: GET
payload:
{
  "username": "ted",
  "password": "newuser123"
}

# user register
/auth/registration
method: POST
payload:
{
  "username": "ted",
  "password": "newuser123"
}

# articles new
/articles
method: POST
payload:
{
  "title": "art3",
  "description": "d3"
}

# articles get all
/articles
method: GET

# articles get one
/articles/:id
method: GET
payload:

# articles update one
/articles/:id
method: PATCH
payload:
{
  "likes": 4
}

# articles delete one
/articles/:id
method: DELETE
```

