/*eslint-disable*/
import Status from 'http-status';

export default (err: any, req: any, res: any, next: any, logger: any, config: any) => {
  logger.error(err);

  const response = {
    type: 'InternalServerError',
    ...config.env === 'development' && {
    message: err.message,
    stack: err.stack,
    },
  };

  res.status(Status.INTERNAL_SERVER_ERROR).json(response);
};
