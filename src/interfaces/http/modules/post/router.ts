/* eslint-disable*/
import { Router } from 'express';
import { SuccessResponse } from '../../../../core/ApiResponse';
import { BadRequestError } from '../../../../core/ApiError';

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
          return new SuccessResponse('success', data).send(res);
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          return new BadRequestError(error.message);
        });
    });

  router
    .post('/', (req: any, res: any) => {
      postUseCase
        .create({ body: req.body })
        .then((data: any) => {
          return new SuccessResponse('success', data).send(res);
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          return new BadRequestError(error.message);
        });
    });

  router
    .put('/:id', (req: any, res: any) => {
      putUseCase
        .update({ body: req.body, id: req.params.id })
        .then((data: any) => {
          return new SuccessResponse('success', data).send(res);
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          return new BadRequestError(error.message);
        });
    });

  router
    .delete('/:id', (req: any, res: any) => {
      deleteUseCase
        .remove({ id: req.params.id })
        .then((data: any) => {
          return new SuccessResponse('success', data).send(res);
        })
        .catch((error: { message: any }) => {
          logger.error(error);
          return new BadRequestError(error.message);
        });
    });

  return router;
};
