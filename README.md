# PokeWeather

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)

## About <a name = "about"></a>
A helpful website for pokemon go users, that allows them to see the weather on any coordiantes.

Website front end is built with React JS and is connected to the backend with exposed REST APIs and Websocket

Backend with made with Sanic - a fast server python framework

The full stack application is deployed with Nginx as a reverse proxy

Website has full TLS support with SSL from Lets Encrypt.

## Getting Started <a name = "getting_started"></a>

Run the front end React APP using
```
npm run start
```

running the backed Sanic server using
```
Python3 server.py
```

### Prerequisites

Node

Python3

Nginx