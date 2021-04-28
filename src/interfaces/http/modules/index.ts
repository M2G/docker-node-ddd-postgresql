/*eslint-disable*/
import { Router } from 'express';
import {SuccessResponse} from "../../../core/ApiResponse";

export default () => {
  const router = Router();

  router.get('/', (req: any, res: any) => {
    return new SuccessResponse('API working').send(res);
  });

  return router;
};
