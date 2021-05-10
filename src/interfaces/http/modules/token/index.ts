import container from '../../../../container';
import router from './router';
import instance from './instance';

export default () => {
  const {logger, response: {Success, Fail}, jwt} = container.cradle;
  const app = instance();

  return {
    app,
    router: router(
      // eslint-disable-next-line
      {logger, jwt, response: {Fail, Success}, ...app}
      )
  };
};
