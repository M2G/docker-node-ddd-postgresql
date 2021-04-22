import Status from 'http-status';
import { Router } from 'express';

export default ({
  getUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  response: { Success, Fail }
}: any) => {
  const router = Router();

 // router.use(auth.authenticate())

  router
    .get('/', (req, res) => {
      getUseCase
        .all(req, res)
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .post('/', (req, res) => {
      postUseCase
        .create({ body: req.body })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .put('/:id', (req, res) => {
      putUseCase
        .update({ id: req.params.id, body: req.body })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .delete('/:id', (req, res) => {
      deleteUseCase
        .remove({ id: req.params.id })
        .then((data: any) => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error: { message: any; }) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  return router
}
