# Docker, NodeJS, MySQL, Typescript with Domain Driven Design

## What is DDD (Domain Driven Design)?

Domain driven design (DDD) is an approach to software design that values simplicity and modeling code as closely to the business domain as possible. This results in code that can be easily understood by the business and evolved as the needs of the business domain change.

By isolating domain code away from all other concerns of the system like infrastructure, security, transportation, serialization etc; the complexity of the system grows only as large as the complexity of the business or problem domain itself.

## Features
* Docker
* NodeJS (+14)
* Typescript

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

## Warning

See : https://medium.com/codespace69/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server-consider-8afadc2385e2
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
If you got : "Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client"
For fix auth for MySQL v8.0 (or more) in NodeJS :
```sh
> docker exec -it (container id) mysql -uroot -p
> root (or your pasword)
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
mysql> FLUSH PRIVILEGES;
mysql> quit
```

