import container from 'container';
import {
 get, getOne, post, put, remove
} from 'app/product';

export default () => {
  const { cradle } = container;
  const { redis, repository: { productRepository } } = cradle;

  const getUseCase = get({ productRepository, redis });
  const getOneUseCase = getOne({productRepository});
  const postUseCase = post({productRepository});
  const putUseCase = put({productRepository});
  const deleteUseCase = remove({productRepository});

  return {
    deleteUseCase,
    getOneUseCase,
    getUseCase,
    postUseCase,
    putUseCase
  };
};
