# Docker, NodeJS, MySQL, Typescript with Domain Driven Design

## What is DDD (Domain Driven Design)?

Domain driven design (DDD) is an approach to software design that values simplicity and modeling code as closely to the business domain as possible. This results in code that can be easily understood by the business and evolved as the needs of the business domain change.

By isolating domain code away from all other concerns of the system like infrastructure, security, transportation, serialization etc; the complexity of the system grows only as large as the complexity of the business or problem domain itself.

## Build with
* Docker
* NodeJS
* Typescript
* Sequelize ORM
* MySQL
---

## Features

- [x] REST API
- [x] Dependency injection
- [x] Configs via environmental variables
- [x] Sequelize with Postgres implementation
- [x] Unit tests
- [x] Badges (coverage, up-to-date dependencies)
- [] GraphQL API
- [] GraphQL playground
- [] Code refactor
- [] Auth functionality (Signup, Login)
- [] JWT Authentication
---
## Run locally



---
## Show DATABASE/TABLE

docker exec -it CONTAINER_ID sh
psql -U postgres YOUR_DATABASE
\l
SELECT * FROM YOUR_TABLE;

---
## Getting Started

Run in development:

```sh
$ npm run watch-debug
```

with docker:

```sh
$ docker-compose up -d
```

Run in production:
```sh
$ run.sh
```
or
```sh
$ npm run build
$ npm run serve
```

Run linter:
```sh
$ npm run tslint
```

Run tests:
```sh
$ npm run test
```

