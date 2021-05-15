/*eslint-disable*/

import container from './container';

const app: any = container.resolve('app');

app
  .start()
  .catch((error: any) => {
    app.logger.error(error.stack);
    process.exit();
  });
