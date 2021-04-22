import path from 'path';

module.exports = function createControllerRoutes (controllerUri: any) {
  const controllerPath = path.resolve('src/interfaces/http/modules', controllerUri)
  const Controller = require(controllerPath)

  return Controller()
}
