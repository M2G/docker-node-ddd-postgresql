import { createContainer, asValue, asFunction } from 'awilix';
// you can do this
import app from './app';
import server from './interfaces/http/server';
import router from './interfaces/http/router';
// const auth = require('./interfaces/http/auth')
import config from '../config';
import logger  from './infra/logging/logger';
import database from './infra/database';
// const jwt = require('./infra/jwt')
import response from './infra/support/response';
import repository from './infra/repositories';

const container = createContainer();

// SYSTEM
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    database: asFunction(database).singleton(),
    response: asFunction(response).singleton(),
    config: asValue(config),
    repository: asFunction(repository).singleton()
  })

export default container;
