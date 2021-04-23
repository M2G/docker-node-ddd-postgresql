/*eslint-disable*/
import Status from 'http-status';
import { Router } from 'express';

export default () => {
  const router = Router();

  router.get('/', (req: any, res: any) => {
    res.status(Status.OK).json({ status: 'API working' });
  });

  return router;
};
