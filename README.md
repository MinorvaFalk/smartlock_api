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

## ADMIN

endpoint: `/data`

required: `admin jwt`

response: `json`

## AUTH

- login
  
endpoint: `/login`

response: `jwt`

- register

endpoint: `/register`

reponse: `user json`

## Booking



