/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response, NextFunction } from 'express';

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

  router.use((req: Request, res: Response, next: NextFunction) =>
    auth.authenticate(req, res, next));

  router
    .get('/', async (req: any, res: any) => {

      try {

        const users = await getUseCase.all({});
        logger.debug(users);
        return res.status(Status.OK).json(Success(users));

      } catch (error) {
        logger.error(error);
       return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

  router
    .get('/:id', async (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid id parameters in request.'));

      try {
        const user = await getOneUseCase.one({ id });
        logger.debug(user);
        return res.status(Status.OK).json(Success(user));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

  router
    .post('/', async (req: any, res: any) => {

      const { body = {} } = req || {};

      try {
        const user = await postUseCase.create({ body });
        logger.debug(user);
        return res.status(Status.OK).json(Success(user));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

  router
    .put('/:id', (req: any, res: any) => {

      const { body = {}, params } = req || {};
      const { id = '' } = params || {};

      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid id parameters in request.'));

      try {
        const user = putUseCase.update({ body, id });
        logger.debug(user);
        return res.status(Status.OK).json(Success(user));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }
    });

  router
    .delete('/:id', (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      try {
        const user = deleteUseCase.remove({ id });
        logger.debug(user);
        return res.status(Status.OK).json(Success(user));
      } catch (error) {
        logger.error(error);
        return res.status(Status.BAD_REQUEST).json(Fail(error.message));
      }

    });

  return router;
};
