# Pervasive - Room Booking System - Backend

## Architecture

- NodeJS 16
- Express 4

## How to run

- clone this repo
- `npm install`
- `npm run start`

if using docker is preferred

- `docker build . -t ando-hunterz/pervasive-backend`
- `docker run -itd --name pervasive-backend -p 80:4500`
  
## Dependency required

- Postgresql
- MongoDB

## API LIST
## ADMIN - `/api/admin`

method: 'GET'

endpoint: `/data`

required: `admin role jwt`

response: 
``` json
[
    {
        "_id": {
            "year": int,
            "week": int
        },
        "start_date": Date,
        "count": int
    }
```

## AUTH - `/api/auth`

- login

endpoint: `/login`

method: `POST`

body: 
```json
{
    "email": email,
    "password": password
}
```

  


response: 
```json
{
    "token": string
}```

- register

endpoint: `/register`

reponse: `user json`

## Booking



