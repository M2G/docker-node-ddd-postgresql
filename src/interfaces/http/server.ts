const express = require('express')

module.exports = ({ config, router, logger }) => {
  const app = express()

  console.log('router', router)

  app.disable('x-powered-by')
 //  app.use(auth.initialize())
  app.use(router)

  return {
    app,
    start: () => new Promise((resolve) => {
      const http = app.listen(config.port, () => {
        const { port } = http.address()
        logger.info(`API - Port ${port}`);
      })
    })
  }
}
