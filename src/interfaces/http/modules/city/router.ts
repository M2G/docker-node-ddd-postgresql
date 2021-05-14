/* eslint-disable*/
import Status from 'http-status';
import { Router } from 'express';

export default ({
  getUseCase,
  getOneUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  auth,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  console.log('auth', auth)

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
          res.status(Status.BAD_REQUEST)
            .json(Fail(error.message));
        });
    });

  router
    .get('/:id', (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      getOneUseCase
        .findById({ id: id })
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
    .post('/', (req: any, res: any) => {

      const { body = {} } = req || {};

      postUseCase
        .create({ body: body })
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

      const { body = {}, params } = req || {};
      const { id = '' } = params || {};

      putUseCase
        .update({ body: body, id: id })
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

      const { params } = req || {};
      const { id = '' } = params || {};

      deleteUseCase
        .remove({ id: id })
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
