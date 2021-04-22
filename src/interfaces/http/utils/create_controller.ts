import path from 'path';

export default function createControllerRoutes (controllerUri: any) {
  const controllerPath = path.resolve('src/interfaces/http/modules', controllerUri)
  const Controller = require(controllerPath)

  return Controller()
};
