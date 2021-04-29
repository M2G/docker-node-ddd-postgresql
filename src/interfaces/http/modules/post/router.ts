/* eslint-disable*/
import Status from 'http-status';
import { Router } from 'express';

export default ({
  getUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

 // router.use(auth.authenticate())

  router
    .get('/', (req: any, res: any) => {
      getUseCase
        .all(req, res)
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message),
);
        });
    });

  router
    .post('/', (req: any, res: any) => {
      postUseCase
        .create({ body: req.body })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message));
        });
    });

  router
    .put('/:id', (req: any, res: any) => {
      putUseCase
        .update({ body: req.body, id: req.params.id })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message));
        });
    });

  router
    .delete('/:id', (req: any, res: any) => {
      deleteUseCase
        .remove({ id: req.params.id })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message));
        });
    });

  return router;
};
