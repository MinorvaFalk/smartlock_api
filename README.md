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
    }
    ```

- register
  
    method: `POST`

    endpoint: `/register`

    body: 
    ```json
    {
        "nim": int,
        "uid": string,
        "email": email,
        "first_name": string,
        "last_name": string,
        "password": string
    }
    ```

    reponse: 
    ```json
    {
        "id": int,
        "nim": string,
        "uid": string,
        "email": string,
        "first_name": string,
        "last_name": string,
        "password": string,
        "updatedAt": string,
        "createdAt": string,
        "role": string
    }
    ```

## Booking - `/api/bookings`
- Get All Booking
    endpoint: `/`

    method: `GET`

    required: `user jwt`

    response: 
    ```json
    [
        {
            "_id": string,
            "start_date": string,
            "end_date": string,
            "duration": int,
            "room_id": string,
            "status": string,
            "user_booking_nim": string,
            "participant": [string],
            "createdAt": string,
            "updatedAt": string,
            "__v": 0
        }
    ]
    ```
 
- Specific user booking
  endpoint: `/user/:nim`

  method: `GET`

  params: `nim: int`

  required: `user jwt`

  reponse: 
  ```json
    {
        "_id": string,
        "start_date": string,
        "end_date": string,
        "duration": int,
        "room_id": string,
        "status": string,
        "user_booking_nim": string,
        "participant": [string],
        "createdAt": string,
        "updatedAt": string,
        "__v": 0
    }
  ```
- Add new booking
  endpoint: `/`

  method: `POST`

  required: `user jwt`

  body: 
  ```json
    {
        "user_booking_nim": int,
        "room_id": int,
        "start_date": date,
        "end_date": date,
        "participant": [string]
    }
  ```

  response: 
  ```json
    {
        "_id": string,
        "start_date": string,
        "end_date": string,
        "duration": int,
        "room_id": string,
        "status": string,
        "user_booking_nim": string,
        "participant": [string],
        "createdAt": string,
        "updatedAt": string,
        "__v": 0
    }
  ```

## Booking



