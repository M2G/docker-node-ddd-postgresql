/* eslint-disable*/
import Status from 'http-status';
import { NextFunction, Request, Response, Router } from 'express';

export default ({
  getUseCase,
  getOneUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  response: { Success, Fail },
                  auth,
}: any) => {
  const router = Router();

 /* router.use((req: Request, res: Response, next: NextFunction) =>
    auth.authenticate(req, res, next));*/

  router
    .get('/', async (req: any, res: any) => {
      try {
        const data = await getUseCase.all({});
        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

 /* router
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
    });*/

  router
    .get('/:id', async (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid id parameters in request.'));

      try {
        const data = await getOneUseCase.one({ id: id });
        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

  /*router
    .get('/:id', (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      getOneUseCase
        .one({ id: id })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data));
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message));
        });
    });*/

  router
    .post('/', async (req: any, res: any) => {

      const { body } = req;
      const { product_id, product_name } = body;

      if (!product_id || !product_name)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

      try {
        const data = await postUseCase.create({ body: body });
        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

  /*router
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
    });*/
  router
    .put('/:id', async (req: any, res: any) => {

      const { body = {}, params } = req || {};
      const { id = '' } = params || {};
      const { product_id, product_name } = body;

      if (!product_id || !product_name)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

        try {
          const data = await putUseCase.update({ body: { product_id, product_name }, id: id });
          logger.debug(data);
          return res.status(Status.OK).json(Success(data));
        } catch (error) {
          logger.error(error);
         return res.status(Status.BAD_REQUEST).json(Fail(error.message));
        }
    });

 /* router
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
    });*/

  router
    .delete('/:id', async (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

        try {
          const data = await deleteUseCase.remove({ id: id });
          logger.debug(data);
          return res.status(Status.OK).json(Success(data));
        } catch (error) {
          logger.error(error);
          return res.status(Status.BAD_REQUEST).json(Fail(error.message));
        }
    });

  /*router
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
    });*/

  return router;
};
