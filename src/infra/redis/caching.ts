/*eslint-disable*/
import * as redis from 'redis';

const portRedis = process.env.PORT_REDIS ?? '6379';

const redisClient = redis.createClient(portRedis);

const set = (key: string, value: any) =>
  redisClient.set(key, JSON.stringify(value));

//@ts-ignore
const get = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  redisClient.get(id, (error, data) => {
    if (error) res.status(400).send(error);
    if (data !== null) res.status(200).send(JSON.parse(data));
    else next();
  });
}

export {
  set,
  get
}
