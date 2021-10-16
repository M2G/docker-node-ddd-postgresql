/*eslint-disable*/
import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from 'express';
import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import * as index from '../http/modules';
import * as product from '../http/modules/product';
import * as country from '../http/modules/country';
import * as city from '../http/modules/city';
import * as store from '../http/modules/store';
import * as users from '../http/modules/users';
import * as status_name from '../http/modules/status_name';
import * as sale from '../http/modules/sale';
import * as order_status from '../http/modules/order_status';

export default ({ config, logger, database }: any) => {
  // console.log('database', database);
  const router = Router();

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }
  router
    .use(cors({
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      origin: ['http://localhost:3000', 'http://localhost:3001'],
    }))
    .use(bodyParser.json());

  router.use('/', index.default());
  router.use('/api/product', product.default().router);
  router.use('/api/country', country.default().router);
  router.use('/api/city', city.default().router);
  router.use('/api/store', store.default().router);
  router.use('/api/users', users.default().router);
  router.use('/api/status_name', status_name.default().router);
  router.use('/api/sale', sale.default().router);
  router.use('/api/order_status', order_status.default().router);
  router.use(() => ({
    ...errorHandler,
    ...[logger, config]
  }));

  return router;
};
