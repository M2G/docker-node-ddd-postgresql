/* eslint-disable*/
import Status from 'http-status-codes';
import { // NextFunction, Request, Response,
  Router } from 'express';

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

  //router.use((req: Request, res: Response, next: NextFunction) =>
  // auth.authenticate(req, res, next));

  router
    .get('/', async (req: any, res: any) => {
      try {
        const data = await getUseCase.all({});
        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
      }
    });

  router
    .get('/:id', async (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid id parameters in request.'));

      try {
        const data = await getOneUseCase.one({ id });
        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
      }
    });

  router
    .post('/', async (req: any, res: any) => {

      const { body } = req || {};
      const { country_name } = body || {};

      if (!country_name)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

      try {
        const data = await postUseCase.create({ ...body });
        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
      }
    });

  router
    .put('/:id', async (req: any, res: any) => {

      const { body = {}, params } = req || {};
      const { id = '' } = params || {};
      const { country_name } = body;

      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid id parameters in request.'));


      if (!country_name)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

      try {
        const data = await putUseCase.update({ id, ...body });

        if (!data) return res.status(Status.NOT_FOUND).json(Fail('Not found.'));

        logger.debug(data);
        return res.status(Status.OK).json(Success(data));
      } catch (error) {
        logger.error(error);
        return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
      }
    });

  router
    .delete('/:id', async (req: any, res: any) => {

      const { params } = req || {};
      const { id = '' } = params || {};

      if (!id)
        return res.status(Status.UNPROCESSABLE_ENTITY).json(Fail('Invalid parameters in request.'));

      try {
        const data = await deleteUseCase.remove({ id });

        if (!data) return res.status(Status.NOT_FOUND).json(Fail('Not found.'));

        logger.debug(data);
        return res.status(Status.NO_CONTENT).json(Success());
      } catch (error) {
        logger.error(error);
        return res.status(Status.INTERNAL_SERVER_ERROR).json(Fail(error.message));
      }
    });

  return router;
};
