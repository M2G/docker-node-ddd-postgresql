/*eslint-disable*/
import path from 'path';


export default async function createControllerRoutes (controllerUri: any) {
  const controllerPath = path.resolve('src/interfaces/http/modules', controllerUri);
  // const Controller = require(controllerPath)
  const Controller = await import(controllerPath);

  return Controller.default();
};
