// const statusMonitor = require('express-status-monitor')
/*eslint-disable*/
// @ts-ignore
const cors = require('cors')
// @ts-ignore
const bodyParser = require('body-parser')
// @ts-ignore
// const compression = require('compression')

const { Router } = require('express')
// @ts-ignore
const { partialRight } = require('ramda')

const controller = require('./utils/create_controller')
// const httpLogger = require('./middlewares/http_logger')
// const errorHandler = require('./middlewares/error_handler')

module.exports = ({ config, logger, database }) => {
  const router = Router()

  /* istanbul ignore if */
  if (config.env === 'development') {
    // router.use(statusMonitor())
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    // router.use(httpLogger(logger))
  }

  router
    .use(cors({
      origin: [
        'http://localhost:8080'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(bodyParser.json())

  router.use('/', controller('index'))
  router.use(`/api/posts`, controller('post').router)

  // router.use(partialRight(errorHandler, [logger, config]))

  return router
}
