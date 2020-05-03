# Custom Smart Home API

This is a small API that I wrote to help me keep track of the state of my smart home devices. I have a number of Amazon Echo devices hooked up to smart plugs and timers. While the system works well to switch things on and off, Alexa can't tell me if something is currently on or off. This API is one step in a chain that will allow me to to ask Alexa to check my device states.

## API Description
The API has two end points:

1. POST `/api/devices/get-state`
1. POST `/api/devices/set-state`

Each endpoint accepts and returns `application/json`. All HTTP responses are 200 OK, even when there is an error. This is to prevent information leakage. (I haven't put a whole lot of security on the API, just enough to prevent the casual user from using it.)

### get-state

Sample JSON body:
```
{
    "deviceName": "my-device-name",
    "apiKey": "my-api-key"
}
```

### set-state

Sample JSON body:
```
{
    "deviceName": "my-device-name",0.l
    "state": "whatever-state-you-want",
    "apiKey": "my-api-key"
}
```

## System Requirements
Requires:

* Node JS
* Redis
* NGINX
* Lets Encrypt for SSL Certs.
