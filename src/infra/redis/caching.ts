/*eslint-disable*/
import type {Response, Request, NextFunction} from 'express';
import * as redis from 'redis';

const portRedis = process.env.PORT_REDIS ?? '6379';

const redisClient = redis.createClient(portRedis);

const isCached = (req: Request | any, res: Response | any, next: NextFunction) => {
  const { params } = req;
  const { id } = params;

  redisClient.get(id, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    if (data) {
      console.log('we Found it in Redis');
      return res.send(data);
    }
      console.log('User Not Found');
      next();
  });
};

export default isCached;
