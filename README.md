# nasa-neows-api-wrapper

## What?

API wrapper for the NASA NeoWs (Near Earth Object Web Service) API.

Developed in accordance with the task given by New Things Co.

The full task description can be found here:
https://drive.google.com/file/d/1aYR-P4EuywQK3nqsPIC2Y2DGh95gWMhc/view

## Used technologies

- Backend/API:
  - Nest.js
  - Jest for E2E and Unit testing
  - axios for REST requests
  - nest-commander for commands
  - Swagger for OpenAPI and interface

## Structure

- packages/api/
  - Contains the Nest.js powered REST API and commands
- packages/lib/
  - Contains DTOs that could be shared with a client application (for example a web frontend).

## Setup

1. Run the following command to install all the node modules:

```
npm install
```

2. Copy the `.env.sample` file to `.env` and fill the required credentials.

## How to use

### Querying the NeoWS API

There is a CLI command that you can use to query the NeoWS api using the same logic as through the REST API provided by this package, by running:

```
npm run command:query-neows <startDate> <endDate>
```

### Watch-mode start

The API can be started in watch-mode for development purposes by running the following command:

```
npm run dev:api
```

### Normal start

The API can be started by running the following command:

```
npm run start:api
```

### Testing

The tests can be ran by running the following command:

```
# Unit tests
npm run test:api
# E2E tests
npm run test-e2e:api
```
