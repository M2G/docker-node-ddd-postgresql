/* eslint-disable*/
import Status from 'http-status';

/* istanbul ignore next */
//@ts-ignore
export default (err, req, res, next, logger, config) => { // eslint-disable-line no-unused-vars
  logger.error(err)

  const response = Object.assign({
    type: 'InternalServerError'
  }, config.env === 'development' && {
    message: err.message,
    stack: err.stack
  })

  res.status(Status.INTERNAL_SERVER_ERROR).json(response)
}