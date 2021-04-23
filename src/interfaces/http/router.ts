import cors from 'cors';
import bodyParser from 'body-parser';
import { Router } from 'express';
import { partialRight } from 'ramda';

import controller from './utils/create_controller';
import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';

export default ({ config, logger, database }: any) => {
  console.log('database', database);

  const router = Router();

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }

  router
    .use(cors({
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
      ],
      origin: [
        'http://localhost:8080',
      ],

    }))
    .use(bodyParser.json());

  router.use('/', controller('index'));
  router.use(`/api/posts`, controller('post').router);
  router.use(partialRight(errorHandler, [logger, config]));

  return router;
};
